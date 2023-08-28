import axios, {
  AxiosDefaults,
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface CustomHeader {
  "device-type": "ios" | "android" | "web";
  "device-name": string;
  "device-app-version": string;
  "device-os-version": string;
  "device-identification": string;
}

type DefaultAxiosInstanceHeader = AxiosInstance["defaults"]["headers"];

/**
 * 헤더 속성을 확장했습니다.
 */
interface CustomAxiosClient extends AxiosInstance {
  defaults: Omit<AxiosInstance["defaults"], "headers"> & {
    headers: DefaultAxiosInstanceHeader & CustomHeader;
  };
}

const apiClient = axios.create({
  timeout: 3000,
}) as CustomAxiosClient;

const handleRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  console.log("[AXIOS_INTERCEPTOR] REQ fulfilled");

  return config;
};
const handleRequestRejected = (
  error: any,
  options?: AxiosInterceptorOptions
) => {
  console.log("[AXIOS_INTERCEPTOR]  REQ rejected", { error });
};

apiClient.interceptors.request.use(
  handleRequestFulfilled,
  handleRequestRejected
);

const handleResponseFulfilled = async (response: AxiosResponse) => {
  console.log("[AXIOS_INTERCEPTOR]  RES fulfilled");
  return response;
};

const handleResponseRejected = async (
  error: any,
  options?: AxiosInterceptorOptions
) => {
  console.log("[AXIOS_INTERCEPTOR]  RES rejected", { error });
};

apiClient.interceptors.response.use(
  handleResponseFulfilled,
  handleResponseRejected
);

export default apiClient;
