import {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import apiClient, { EnfpyAxiosHeaders } from "./apiClient";
import { createEventEmitter } from "./event";
import createAuthApi, { AuthApi } from "./auth";
import createUserApi, { UserApi } from "./user";

export type Event = {
  name: string;
  data?: any;
};

/**
 * TODO 클라이언트를 직접 노출하지 말고 접근해야 하는 케이스를 제한해서 관리할 것.
 * 기존  ApiClient class를 사용하는 것을 고려해보기
 */

interface EnfpyApiClientConfig {
  baseUrl?: string;
  headers?: Partial<EnfpyAxiosHeaders>;
}

enum NETWORK_STATE {
  "UNAUTHORIZED" = 401,
}

// 재시도 무시 로직
const RETRY_SKIP = new Set([
  "/auth/v1/token",
  "/auth/v1/gateway",
  "/auth/v1/sign-out",
]);

/**
 * DeviceInfo.getUniqueIdSync
 * @todo 길이나 제한 확인해보기
 * @see https://www.npmjs.com/package/react-native-device-info
 */
const DEFAULT_HEADER = {
  ["device-type"]: "web",
  ["device-name"]: "SM-N986N",
  ["device-os-version"]: "12",
  ["device-identification"]: "2CF6F155-1E3B-4611-99C5-1EB5BEF9FC20",
  ["device-app-version"]: "1.0.0",
} as const;

/**
 * 토큰 업데이트가 필요한 케이스
 */
const ERROR_TYPE_REQUIRING_UPDATE = new Set([
  // DB에 토큰 정보가 없을 경우, 올바르지 않은 토큰 실패할 수 있지만 호출
  "unauthorized_token_error",
  // Legacy, 토큰이 만료되었을 경우
  "token_expired_error",
  // RTR 적용된 이후 Access Token 만료할 경우
  "access_token_expired_error",
  // refresh_token이 사용된 케이스
  "refresh_token_reuse_error",
]);

const shouldUpdateToken = (response: AxiosResponse) => {
  return ERROR_TYPE_REQUIRING_UPDATE.has(response.data?.content?.type);
};

export type EventName = "onUnauthorizedRequest";

/**
 * 전역에서 apiClient의 설정을 변경하는 것을 제한합니다.
 */
export class EnfpyApiClient {
  private instance: AxiosInstance;
  auth: AuthApi;
  user: UserApi;

  constructor(params: {
    client: AxiosInstance;
    apis: {
      auth: AuthApi;
      user: UserApi;
    };
  }) {
    const { client, apis } = params;
    this.instance = client;

    this.setConfig({ headers: DEFAULT_HEADER });

    this.instance.interceptors.response.use(
      this.handleResponseFulfilled,
      this.handleResponseRejected
    );

    this.auth = apis.auth;
    this.user = apis.user;
  }

  private handleResponseFulfilled = async (response: AxiosResponse) => {
    return response;
  };
  private handleResponseRejected = async (
    error: AxiosError,
    options?: AxiosInterceptorOptions
  ) => {
    const { config, response } = error;

    if (response) {
      const shouldUpdateAuth =
        shouldUpdateToken(response) &&
        response.status === NETWORK_STATE.UNAUTHORIZED;

      if (shouldUpdateAuth) {
        // 토큰 갱신 요청 발행.
        this.emit("onUnauthorizedRequest", config);
      }
    }

    throw error;
  };

  setConfig({ baseUrl, headers }: EnfpyApiClientConfig) {
    if (baseUrl) {
      this.instance.defaults.baseURL = baseUrl;
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        const value = headers[key];
        if (value) {
          this.instance.defaults.headers[key] = value;
        }
      });
    }
  }

  /**
   * Event
   */
  emit = (eventName: EventName, data?: AxiosRequestConfig) => {
    const event = {
      name: eventName,
      data,
    };

    this.eventEmitter.emit(eventName, event);
  };
  /**
   * Event
   */
  private eventEmitter = createEventEmitter<Event>();

  addEventListener = (eventName: EventName, listener: (event: Event) => void) =>
    this.eventEmitter.addEventListener(eventName, listener);

  updateToken = (accessToken: string) => {
    this.instance.defaults.headers["Authorization"] = `bearer ${accessToken}`;
  };

  deleteToken = () => {
    delete this.instance.defaults.headers["Authorization"];
  };
}

export default new EnfpyApiClient({
  client: apiClient,
  apis: {
    auth: createAuthApi(apiClient),
    user: createUserApi(apiClient),
  },
});
