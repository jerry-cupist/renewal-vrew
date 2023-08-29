import {
  RequestMessage,
  ResponseMessage,
  ErrorMessage,
  BridgeError,
  BridgeActions,
} from "../types";

export const createRequestMessage = <D>(
  action: BridgeActions,
  data?: D
): RequestMessage => ({
  type: "request",
  action,
  request_id: 1,
  data,
});

export const createResponseMessage = <D>(
  action: BridgeActions,
  request_id: number,
  data: D
): ResponseMessage<D> => ({
  type: "response",
  action,
  request_id,
  data,
});

export const createErrorMessage = (
  action: BridgeActions,
  request_id: number,
  error: BridgeError
): ErrorMessage => ({
  type: "error",
  action,
  request_id,
  error,
});

export const postRequestMessageToApp = (message: RequestMessage) => {
  (window as any).ReactNativeWebView?.postMessage(JSON.stringify(message));
};
