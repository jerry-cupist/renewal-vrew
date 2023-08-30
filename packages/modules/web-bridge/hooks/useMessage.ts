import { WebBridgeActions } from "../types/action";
import {
  BridgeError,
  ErrorMessage,
  RequestMessage,
  ResponseMessage,
} from "../types/message";

export const useMessage = () => {
  const createRequestMessage = <D>(
    action: WebBridgeActions,
    data?: D
  ): RequestMessage => ({
    type: "request",
    action,
    request_id: 1,
    data,
  });

  const createResponseMessage = <D>(
    action: WebBridgeActions,
    request_id: number,
    data: D
  ): ResponseMessage<D> => ({
    type: "response",
    action,
    request_id,
    data,
  });

  const createErrorMessage = (
    action: WebBridgeActions,
    request_id: number,
    error: BridgeError
  ): ErrorMessage => ({
    type: "error",
    action,
    request_id,
    error,
  });

  const post = (message: RequestMessage) => {
    (window as any).ReactNativeWebView?.postMessage(JSON.stringify(message));
  };

  return {
    createRequestMessage,
    createResponseMessage,
    createErrorMessage,
    post,
  };
};
