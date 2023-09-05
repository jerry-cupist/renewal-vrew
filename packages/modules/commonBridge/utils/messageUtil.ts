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
  requestId: requestIdUtil.increase(),
  data,
});

export const createResponseMessage = <
  ActionType extends string = string,
  DataType = any
>(
  action: ActionType,
  requestId: number,
  data: DataType
): ResponseMessage<ActionType, DataType> => ({
  type: "response",
  action,
  requestId,
  data,
});

export class WebViewMessageError extends Error {
  constructor(
    public action: string,
    public requestId: number,
    public error: BridgeError
  ) {
    super(`[${error.err_code}] ${error.err_msg}`);
    this.name = "WebViewMessageError";
  }
}
