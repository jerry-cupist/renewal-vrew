import { BridgeActions, RequestMessage } from "../types";

export const createRequestMessage = <D>(
  action: BridgeActions,
  data?: D
): RequestMessage => ({
  type: "request",
  action,
  request_id: 1,
  data,
});

export const postRequestMessage = (message: RequestMessage) => {
  (window as any).ReactNativeWebView?.postMessage(JSON.stringify(message));
};
