import {
  RequestMessage,
  ResponseMessage,
  ErrorMessage,
  BridgeError,
} from "../types/message";
import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

export const createRequestMessage = <D>(
  action: WebBridgeActions,
  data: D
): RequestMessage => ({
  type: "request",
  action,
  request_id: requestIdUtil.increase(),
  data,
});

export const createResponseMessage = <D>(
  action: WebBridgeActions,
  request_id: number,
  data: D
): ResponseMessage<D> => ({
  type: "response",
  action,
  request_id,
  data,
});

export const createErrorMessage = (
  action: WebBridgeActions,
  request_id: number,
  error: BridgeError
): ErrorMessage => ({
  type: "error",
  action,
  request_id,
  error,
});

export const postMessage = <T extends keyof WebBridgeActionDatas>(
  action: T,
  data?: WebBridgeActionDatas[T]
) => {
  const message = createRequestMessage(action, data);
  (window as any).ReactNativeWebView?.postMessage(JSON.stringify(message));
};
