/**
 * RN(webView) => Web 브릿지 코드
 */

import WebView, { WebViewMessageEvent } from "react-native-webview";

export interface BridgeMessage<
  ActionType extends string = string,
  DataType = any
> {
  type: "request" | "response";
  action: ActionType;
  request_id: number;
  data: DataType;
}

export interface RequestMessage<
  ActionType extends string = string,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "request";
}

export interface ResponseMessage<
  ActionType extends string = string,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "response";
}

/**
 * APP => WEB 케이스가 분리되어야 함
 */
export enum AppBridgeAction {
  NETWORK_REQUEST = "network-request",
}

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

export const createRequestMessage = <
  ActionType extends AppBridgeAction,
  DataType extends object
>(
  action: ActionType,
  data: DataType
): RequestMessage<ActionType, DataType> => ({
  type: "request",
  action,
  request_id: requestIdUtil.increase(),
  data,
});

export const createResponseMessage = <DataType>(
  action: AppBridgeAction,
  request_id: number,
  data: DataType
): ResponseMessage<AppBridgeAction> => ({
  type: "response",
  action,
  request_id,
  data,
});

interface PostMessageParams {
  target: WebView;
  action: AppBridgeAction;
  data?: any;
  timeout?: number;
}

type WebViewMessageHandler = (event: WebViewMessageEvent) => void;

/**
 * APP => WEB Request message
 */
const _postMessage = <ResponseType = any>(
  params: PostMessageParams
): Promise<BridgeMessage<AppBridgeAction, ResponseType>> => {
  const { target, action, data, timeout = 3000 } = params;

  let handleResponseMassage: WebViewMessageHandler = () => {};

  return new Promise((resolve, reject) => {
    let timeId: null | number = null;

    try {
      if (!target) {
        throw new Error("[POST_MESSAGE] target을 찾을 수 없습니다");
      }
      timeId = setTimeout(() => {
        target.removeEventListener("message", handleResponseMassage);
        reject(new Error(`[POST_MESSAGE]_[TIMEOUT] ${action}`));
      }, timeout);

      const requestMessage = createRequestMessage(action, data);
      target.postMessage(JSON.stringify(requestMessage));

      handleResponseMassage = (event) => {
        try {
          if (typeof event.nativeEvent.data !== "string") {
            return;
          }

          const responseMessage = JSON.parse(
            event.nativeEvent.data
          ) as BridgeMessage<AppBridgeAction, ResponseType>;

          const isValidMessage =
            requestMessage.request_id === responseMessage.request_id;
          if (!isValidMessage) {
            return;
          }

          if (timeId) {
            clearTimeout(timeId);
          }
          target.removeEventListener("message", handleResponseMassage);
          resolve(responseMessage);
        } catch (error: unknown) {
          console.log(`[NETWORK]-수신 에러${error}`);
          reject(error);
        }
      };

      // webView에 수신 이벤트 처리
      target.addEventListener("message", handleResponseMassage);
    } catch (error: unknown) {
      reject(error);
    }
  });
};

const appBridge = { postMessage: _postMessage };

export default appBridge;
