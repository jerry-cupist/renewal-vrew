import {
  BridgeError,
  ErrorMessage,
  ResponseMessage,
  BridgeActions,
} from "../types";

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
