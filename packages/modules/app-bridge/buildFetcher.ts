import WebView from "react-native-webview";
import { EnfpyRequestConfig } from "../../../packages/apis/enfpy";
import appBridge, { AppBridgeAction } from ".";

interface NetworkRequestResult<
  ConfigType extends EnfpyRequestConfig = EnfpyRequestConfig,
  DataType = any
> {
  data: DataType;
  config: ConfigType;
}

export const buildFetcher = (webview: WebView) =>
  function fetcher<ResponseType = any>(requestConfig: EnfpyRequestConfig) {
    return appBridge
      .postMessage<NetworkRequestResult<EnfpyRequestConfig, ResponseType>>({
        target: webview,
        action: AppBridgeAction.NETWORK_REQUEST,
        timeout: 3000,
        data: requestConfig,
      })
      .then((message) => {
        const networkResponse = message.data;
        return networkResponse;
      });
  };
