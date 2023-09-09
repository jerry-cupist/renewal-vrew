export enum MessageError {
  NOT_REGISTERED_ACTION = 4004,
  /** 액션 핸들러를 찾지 못함 */
  NOT_REGISTERED_ACTION_HANDLER = 4005,
  REQUEST_TIMEOUT = 5000,
  /** requestId가 없거나 잘못된 경우 */
  INVALID_REQUEST_ID = 6000,

  /** 웹뷰를 찾지 못함 */
  NOT_FOUND_WEBVIEW = 7000,
}

export type BridgeMessageType = 'request' | 'response' | 'error'

export interface BridgeMessage<
  MessageType extends BridgeMessageType = BridgeMessageType,
  ActionType extends string = string,
  DataType = any,
> {
  type: MessageType
  action: ActionType
  data: DataType
  requestId: number
}
export type RequestMessage<
  ActionType extends string = string,
  DataType = any,
> = BridgeMessage<'request', ActionType, DataType>

export type ResponseMessage<
  ActionType extends string = string,
  DataType = any,
> = BridgeMessage<'response', ActionType, DataType>
export interface BridgeErrorType {
  err_code: MessageError
  err_msg: string
}

export interface ErrorMessage<
  ActionType extends string = string,
  DataType = any,
> extends BridgeMessage<'error', ActionType, DataType> {
  error: BridgeErrorType
}
