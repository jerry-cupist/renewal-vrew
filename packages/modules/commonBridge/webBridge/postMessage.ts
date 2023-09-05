/**
 * RN(webView) => Web 브릿지 코드
 */

import WebView, { WebViewMessageEvent } from "react-native-webview";
import { BridgeMessage, MessageError, ResponseMessage } from "../types/message";
import {
  BridgeError,
  CreateRequestMessageParams,
  createRequestMessage,
} from "../utils/messageUtil";

type WebViewMessageHandler = (event: WebViewMessageEvent) => void;

/**
 * APP => WEB Request message
 */
const postMessage = <ActionType extends string = string, ResponseType = any>(
  target: WebView,
  message: BridgeMessage<"request", ActionType>,
  options?: { timeout?: number }
): Promise<BridgeMessage<"response", ActionType, ResponseType>> => {
  const { timeout = 3000 } = options || {};
  const { action } = message;

  let handleResponseMessage: WebViewMessageHandler = () => {};

  return new Promise((resolve, reject) => {
    let timeId: null | number = null;

    try {
      if (!target) {
        throw new Error("[POST_MESSAGE] target을 찾을 수 없습니다");
      }
      timeId = setTimeout(() => {
        target.removeEventListener("message", handleResponseMessage);
        reject(new Error(`[POST_MESSAGE]_[TIMEOUT] ${action}`));
      }, timeout);

      target.postMessage(JSON.stringify(message));

      handleResponseMessage = (event) => {
        try {
          if (typeof event.nativeEvent.data !== "string") {
            return;
          }

          const responseMessage = JSON.parse(
            event.nativeEvent.data
          ) as ResponseMessage<ActionType, ResponseType>;

          const isResponseMessage = responseMessage.type === "response";
          if (!isResponseMessage) {
            return;
          }

          if (typeof responseMessage.requestId === "undefined") {
            throw new BridgeError({
              action,
              error: {
                err_code: MessageError.INVALID_REQUEST_ID,
                err_msg: `[APP_BRIDGE]_[RESPONSE]: requestId를 찾을 수 없습니다`,
              },
            });
          }

          const isValidMessage =
            message.requestId.toString() ===
            responseMessage.requestId.toString();
          if (!isValidMessage) {
            return;
          }

          if (timeId) {
            clearTimeout(timeId);
          }
          target.removeEventListener("message", handleResponseMessage);
          resolve(responseMessage);
        } catch (error: unknown) {
          console.log(`[NETWORK]-수신 에러${error}`);
          reject(error);
        }
      };

      // webView에 수신 이벤트 처리
      target.addEventListener("message", handleResponseMessage);
    } catch (error: unknown) {
      console.error({ error });
      reject(error);
    }
  });
};

/**
 * 요청 메세지
 */
export const requestMessage = <
  ActionType extends string = string,
  DataType = any
>(
  target: WebView,
  params: CreateRequestMessageParams<ActionType, DataType>,
  options?: { timeout?: number }
) => postMessage(target, createRequestMessage(params), options);

export type RequestMessageType<
  ActionType extends string = string,
  DataType = any
> = (
  target: WebView,
  params: CreateRequestMessageParams<ActionType, DataType>,
  options?: { timeout?: number }
) => Promise<BridgeMessage<"response", ActionType, any>>;

export default postMessage;
