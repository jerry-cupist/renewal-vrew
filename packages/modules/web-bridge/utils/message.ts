import {
  RequestMessage,
  ResponseMessage,
  ErrorMessage,
  BridgeError,
} from "../types/message";
import { WebBridgeActions } from "../types/action";

export const createRequestMessage = <D>(
  action: WebBridgeActions,
  data: D
): RequestMessage => ({
  type: "request",
  action,
  request_id: 1,
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
