import WebView from "react-native-webview";
import webBridge from ".";
import { AxiosRequestConfig } from "axios";

export type NetworkRequestConfig<D = any> = Pick<
  AxiosRequestConfig<D>,
  "baseURL" | "params" | "data" | "url" | "method" | "timeout"
>;

interface NetworkRequestResult<
  ConfigType extends NetworkRequestConfig = NetworkRequestConfig,
  DataType = any
> {
  data: DataType;
  config: ConfigType;
}

export const FETCHER_ACTION = {
  FETCHER_REQUEST: "fetcher-request",
} as const;

export type FetcherActionType = typeof FETCHER_ACTION;

/**
 * @todo 응답값추론 추가
 * @todo AppBridgeAction.NETWORK_REQUEST가 디폴트 타입으로 존재해야한다.
 * @todo 브랜드별로 액션타입을 추가할 수 있어야한다.
 */
const buildFetcher = (webview: WebView) =>
  function fetcher(requestConfig: NetworkRequestConfig) {
    return webBridge
      .postMessage({
        target: webview,
        action: FETCHER_ACTION.FETCHER_REQUEST,
        timeout: requestConfig.timeout || 3000,
        data: requestConfig,
      })
      .then((message) => {
        const networkResponse = message.data;
        return networkResponse;
      });
  };

export type Fetcher = ReturnType<typeof buildFetcher>;
export default buildFetcher;
