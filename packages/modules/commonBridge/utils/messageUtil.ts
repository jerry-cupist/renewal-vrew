import {
  BridgeErrorType,
  RequestMessage,
  ResponseMessage,
} from "../types/message";

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

export interface CreateRequestMessageParams<
  ActionType extends string = string,
  DataType = any
> {
  action: ActionType;
  data: DataType;
}

export interface CreateResponseMessageParams<
  ActionType extends string = string,
  DataType = any
> {
  action: ActionType;
  data: DataType;
  requestId: number;
}

export const createRequestMessage = <
  ActionType extends string = string,
  DataType = any
>(
  params: CreateRequestMessageParams<ActionType, DataType>
): RequestMessage<ActionType, DataType> => ({
  type: "request",
  action: params.action,
  requestId: requestIdUtil.increase(),
  data: params.data,
});

export const createResponseMessage = <
  ActionType extends string = string,
  DataType = any
>(
  params: CreateResponseMessageParams<ActionType, DataType>
): ResponseMessage<ActionType, DataType> => ({
  type: "response",
  action: params.action,
  requestId: params.requestId,
  data: params.data,
});

export class BridgeError extends Error {
  constructor(
    private args: { action: string; error: BridgeErrorType; requestId?: number }
  ) {
    const { action, error } = args;
    super(`[${error.err_code}]_[${action}] ${error.err_msg}`);
    this.name = "BridgeError";
  }
}
