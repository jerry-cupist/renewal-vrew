import { WebBridgeActionDatas } from "../types/action";
import { createRequestMessage } from "../utils/message";

export const useBridge = () => {
  const postMessage = <T extends keyof WebBridgeActionDatas>(
    action: T,
    data?: WebBridgeActionDatas[T]
  ) => {
    const message = createRequestMessage(action, data);
    (window as any).ReactNativeWebView?.postMessage(JSON.stringify(message));
  };

  return { postMessage };
};
