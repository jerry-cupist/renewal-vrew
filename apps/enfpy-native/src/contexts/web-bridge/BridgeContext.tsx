import React from 'react';
import {createContext, useContext, useRef} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {NavigationProp} from '@react-navigation/native';
import {navigationHandlers} from './handlers/navigation';
import {devHandlers} from './handlers/dev';
import {
  MessageError,
  RequestMessage,
} from '@vrew/modules/web-bridge/types/message';
import {
  createErrorMessage,
  createResponseMessage,
} from '@vrew/modules/web-bridge/utils/message';

export type MessageHandler = (event: WebViewMessageEvent) => Promise<boolean>;

export interface BridgeContextValue {
  createMessageHandler?: (args: CreateMessageHandlerArgs) => MessageHandler;
}

export interface BridgeProviderProps {}

interface CreateMessageHandlerArgs {
  id: string;
  webView: WebView;
  navigation: NavigationProp<any>;
}

export const BridgeContext = createContext<BridgeContextValue>({});

export const BridgeProvider = (props: BridgeProviderProps) => {
  // 모든 webview에 동일한 이벤트를 전파할 때 필요할 수 있으므로 제거하지 않음
  const webViewRef = useRef<Record<string, WebView>>({});

  // TODO: createHandler 등을 통해 각 핸들러의 매개변수와 반환값이 추론되도록 변경
  const messageHandler = {
    ...navigationHandlers,
    ...devHandlers,
  };

  const createMessageHandler = (args: CreateMessageHandlerArgs) => {
    webViewRef.current[args.id] = args.webView;

    return async (e: WebViewMessageEvent): Promise<boolean> => {
      if (!e?.nativeEvent?.data) {
        return false;
      }

      const {data: message} = e.nativeEvent;
      const {webView} = args;

      const requestMessage = JSON.parse(message);
      const {action, request_id: requestId} = requestMessage as RequestMessage;

      const handler = messageHandler[action];

      // 에러 전송(정의되지 않은 action)
      if (typeof handler !== 'function') {
        const errorMessage = createErrorMessage(action, requestId, {
          err_code: MessageError.NOT_REGISTERED_ACTION,
          err_msg: 'Not registered action',
        });
        webView.postMessage(JSON.stringify(errorMessage));

        return false;
      }

      // 응답결과 전송
      try {
        const responseData = await handler(requestMessage, args);
        const responseMessage = createResponseMessage(
          action,
          requestId,
          responseData,
        );
        webView.postMessage(JSON.stringify(responseMessage));
      } catch (err) {
        // TODO: 에러 타입에 따른 error message 전송
        // 1. timeout
        // 2. 각 handler 이벤트 실패
        const errorMessage = createErrorMessage(action, requestId, {
          err_code: 0,
          err_msg: 'error message',
        });
        webView.postMessage(JSON.stringify(errorMessage));
        return false;
      }

      return true;
    };
  };

  return <BridgeContext.Provider {...props} value={{createMessageHandler}} />;
};

export const useBridge = () => useContext(BridgeContext);
