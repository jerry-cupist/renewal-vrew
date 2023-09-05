import {
  BridgeMessage,
  BridgeMessageType,
  ResponseMessage,
} from "../../types/message";
import {
  CreateRequestMessageParams,
  CreateResponseMessageParams,
  createRequestMessage,
  createResponseMessage,
} from "../../utils/messageUtil";

type PostMessageType = "request" | "response";
type MessageEventHandler = (event: MessageEvent) => void;

/**
 * WEB => APP의 요청과 APP => WEB의 응답을 처리한다.
 * @param param.timeout {number} (default:3000)
 * TODO: 응답타입 추론
 * TODO: 요청 타입
 */
export const postMessage = <
  MessageType extends BridgeMessageType = BridgeMessageType,
  ActionType extends string = string,
  DataType = any
>(
  message: BridgeMessage<MessageType, ActionType, DataType>,
  options?: { timeout?: number }
): Promise<ResponseMessage<ActionType>> =>
  new Promise((resolve, reject) => {
    const { timeout = 3000 } = options || {};
    const { action, type, requestId } = message;
    const isRequestMessage = type === "request";
    const isResponseMessage = type === "response";

    let timeId: null | number = null;
    let handleResponseMessage: MessageEventHandler = () => {};

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

      if (isResponseMessage && typeof requestId !== "number") {
        throw new Error(
          `[POST_MESSAGE]_RES requestId를 찾을 수 없습니다: ${requestId}`
        );
      }

      webView.postMessage(JSON.stringify(message));

      if (isRequestMessage) {
        handleResponseMessage = (event: MessageEvent<string>) => {
          try {
            const { data } = event;
            const requestMessage = message;
            const responseMessage = JSON.parse(
              data
            ) as ResponseMessage<ActionType>;
            if (requestMessage.requestId !== responseMessage.requestId) {
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

export type AppPostMessage<
  MessageType extends BridgeMessageType = BridgeMessageType,
  ActionType extends string = string,
  DataType = any
> = (
  message: BridgeMessage<MessageType, ActionType, DataType>,
  options?: {
    timeout?: number;
  }
) => Promise<ResponseMessage<ActionType>>;

/**
 * 요청 메세지
 */
export const requestMessage = <
  ActionType extends string = string,
  DataType = any
>(
  params: CreateRequestMessageParams<ActionType, DataType>
) => postMessage(createRequestMessage(params));

export type AppRequestMessage<
  ActionType extends string = string,
  DataType = any
> = (
  params: CreateRequestMessageParams<ActionType, DataType>
) => Promise<ResponseMessage<ActionType>>;

/**
 * 응답 메세지
 */
export const responseMessage = <
  ActionType extends string = string,
  DataType = any
>(
  params: CreateResponseMessageParams<ActionType, DataType>
) => postMessage(createResponseMessage(params));

export type AppResponseMessage<
  ActionType extends string = string,
  DataType = any
> = (
  params: CreateResponseMessageParams<ActionType, DataType>
) => Promise<ResponseMessage<ActionType>>;
