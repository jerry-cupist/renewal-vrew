import {useNavigationHandler} from './hooks/useNavigationHandler';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {BridgeActions, RequestMessage} from '@vrew/modules/web-bridge/types';
import {
  createErrorMessage,
  createResponseMessage,
} from '@vrew/modules/web-bridge/utils/message';
import {MessageError} from '@vrew/modules/web-bridge/types';
import {NavigationProp} from '@react-navigation/native';

export type MessageHandler = (event: WebViewMessageEvent) => Promise<boolean>;
export interface BridgeContextValue {
  createMessageHandler?: (args: CreateMessageHandlerArgs) => MessageHandler;
}
export interface BridgeProviderProps {}
export interface CreateMessageHandlerArgs {
  id: string;
  webView: WebView;
  navigation: NavigationProp<any>;
}

export const BridgeContext = createContext<BridgeContextValue>({});

export const BridgeProvider = (props: BridgeProviderProps) => {
  const webViewRef = useRef<Record<string, WebView>>({});

  // 사용 가능한 bridge actions 정의
  const navigationHandler = useNavigationHandler();

  // bridge actions 병합
  const messageHandler = useMemo<Record<BridgeActions, Function>>(
    () => ({
      ...navigationHandler,
    }),
    [navigationHandler],
  );

  const createMessageHandler = useCallback(
    (args: CreateMessageHandlerArgs) => {
      webViewRef.current[args.id] = args.webView;

      return async (e: WebViewMessageEvent): Promise<boolean> => {
        if (!e?.nativeEvent?.data) {
          return false;
        }

        const {data} = e.nativeEvent;
        const {webView} = args;

        const requestMessage = JSON.parse(data) as RequestMessage;
        const {action, request_id: requestId} = requestMessage;

        const handler = messageHandler[action];

        // 에러 전송
        if (typeof handler !== 'function') {
          const errorMessage = createErrorMessage(action, requestId, {
            err_code: MessageError.NOT_REGISTERED_ACTION,
            err_msg: 'Not registered action',
          });
          webView.postMessage(JSON.stringify(errorMessage));

          return false;
        }

        // 응답결과 전송
        const responseData = await handler(requestMessage, args);
        const responseMessage = createResponseMessage(
          action,
          requestId,
          responseData,
        );
        webView.postMessage(JSON.stringify(responseMessage));

        return true;
      };
    },
    [messageHandler, webViewRef],
  );

  return <BridgeContext.Provider {...props} value={{createMessageHandler}} />;
};

export const useBridge = () => useContext(BridgeContext);
