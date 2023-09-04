import { BridgeError, RequestMessage, ResponseMessage } from "../types/message";

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

export const createRequestMessage = <
  ActionType extends string = string,
  DataType = any
>(
  action: ActionType,
  data: DataType
): RequestMessage<ActionType, DataType> => ({
  type: "request",
  action,
  request_id: requestIdUtil.increase(),
  data,
});

export const createResponseMessage = <
  ActionType extends string = string,
  DataType = any
>(
  action: ActionType,
  request_id: number,
  data: DataType
): ResponseMessage<ActionType, DataType> => ({
  type: "response",
  action,
  request_id,
  data,
});

export class WebViewMessageError extends Error {
  constructor(
    public action: string,
    public request_id: number,
    public error: BridgeError
  ) {
    super(`[${error.err_code}] ${error.err_msg}`);
    this.name = "WebViewMessageError";
  }
}
