/**
 * RN(webView) => Web 브릿지 코드
 */

import WebView, { WebViewMessageEvent } from "react-native-webview";
import { BridgeMessage, ResponseMessage } from "../types/message";
import { createRequestMessage } from "../utils/messageUtil";

export interface PostMessageParams<ActionType extends string = string> {
  target: WebView;
  action: ActionType;
  data?: any;
  timeout?: number;
}

type WebViewMessageHandler = (event: WebViewMessageEvent) => void;

/**
 * APP => WEB Request message
 */
const postMessage = <ActionType extends string = string, ResponseType = any>(
  params: PostMessageParams
): Promise<BridgeMessage<ActionType, ResponseType>> => {
  const { target, action, data, timeout = 3000 } = params;

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

      const requestMessage = createRequestMessage(action, data);
      target.postMessage(JSON.stringify(requestMessage));

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

          if (typeof responseMessage.request_id === "undefined") {
            throw new Error(
              `[APP_BRIDGE]_[RESPONSE]: requestId를 찾을 수 없습니다`
            );
          }

          const isValidMessage =
            requestMessage.request_id.toString() ===
            responseMessage.request_id.toString();
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

export default postMessage;
