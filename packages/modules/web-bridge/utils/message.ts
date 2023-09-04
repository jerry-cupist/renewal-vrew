import {
  RequestMessage,
  ResponseMessage,
  ErrorMessage,
  BridgeError,
  BridgeActions,
} from "../types/message";
import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

/**
 * TODO: DataType추론
 */
export const createRequestMessage = <
  ActionType extends BridgeActions,
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
  ActionType extends BridgeActions,
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

/**
 * @deprecated WebViewMessageError 사용 권고
 */
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

export class WebViewMessageError extends Error {
  constructor(
    public action: BridgeActions,
    public request_id: number,
    public error: BridgeError
  ) {
    super(`[${error.err_code}] ${error.err_msg}`);
    this.name = "WebViewMessageError";
  }
}

type PostMessageType = "request" | "response";

/**
 * WEB => APP의 요청과 APP => WEB의 응답을 처리한다.
 * @param param.timeout {number} (default:3000)
 * TODO: 응답타입 추론
 */
export const postMessage = <
  ActionType extends BridgeActions = BridgeActions,
  DataType = any,
  MessageType extends PostMessageType = "request",
  RequestIdType = MessageType extends "response" ? number : undefined
>(params: {
  action: ActionType;
  data?: DataType;
  timeout?: number;
  type: MessageType;
  requestId?: RequestIdType;
}): Promise<ResponseMessage<ActionType>> =>
  new Promise((resolve, reject) => {
    const { action, data, timeout = 3000, type } = params;
    const isRequestMessage =
      type === "request" && typeof params.requestId === "undefined";
    const isResponseMessage = type === "response";

    let timeId: null | number = null;
    let handleResponseMessage = (event: MessageEvent<string>) => {};

    try {
      const webView =
        typeof window !== "undefined"
          ? (window as any).ReactNativeWebView
          : null;

      if (!webView) {
        throw new Error("[POST_MESSAGE] 웹뷰를 찾을 수 없습니다");
      }

      if (isRequestMessage) {
        timeId = setTimeout(() => {
          reject(new Error(`[POST_MESSAGE]_[TIMEOUT] ${action}`));
        }, timeout);
      }

      if (isResponseMessage && typeof params.requestId !== "number") {
        throw new Error(
          `[POST_MESSAGE]_RES requestId를 찾을 수 없습니다: ${params.requestId}`
        );
      }

      const message =
        params.type === "request"
          ? createRequestMessage(action, data)
          : createResponseMessage(action, params.requestId as number, data);

      webView.postMessage(JSON.stringify(message));

      if (isRequestMessage) {
        handleResponseMessage = (event: MessageEvent<string>) => {
          try {
            const { data } = event;
            const requestMessage = message;
            const responseMessage = JSON.parse(
              data
            ) as ResponseMessage<ActionType>;
            if (requestMessage.request_id !== responseMessage.request_id) {
              return;
            }

            window.removeEventListener("message", handleResponseMessage);
            if (typeof timeId === "number") {
              clearTimeout(timeId);
            }

            resolve(responseMessage);
          } catch (error: unknown) {
            reject(error);
          }
        };

        window.addEventListener("message", handleResponseMessage);
      }
    } catch (error: unknown) {
      if (isRequestMessage) {
        window.removeEventListener("message", handleResponseMessage);
      }
      reject(error);
    }
  });

const messageUtil = {
  createRequestMessage,
  createResponseMessage,
  createErrorMessage,
  postMessage,
};

export default messageUtil;
