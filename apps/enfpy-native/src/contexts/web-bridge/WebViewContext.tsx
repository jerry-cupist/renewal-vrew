import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext, useRef} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {NavigationProp} from '@react-navigation/native';

export type MessageHandler = (event: WebViewMessageEvent) => Promise<boolean>;

export interface WebViewContextValue {
  registerWebView: (params: {webView: WebView; id: string}) => void;
  getAllWebView: () => void;
  getWebView: (id: string) => WebView | null;
}

export interface CreateMessageHandlerArgs {
  navigation: NavigationProp<any>;
  webView: WebView;
  id: string;
}

export const WebViewContext = createContext<WebViewContextValue | null>(null);

/**
 * webView참조를 기록한다.
 */
export const WebViewContainer = ({children}: PropsWithChildren) => {
  // 모든 webview에 동일한 이벤트를 전파할 때 필요할 수 있으므로 제거하지 않음
  const webViewRef = useRef<Record<string, WebView>>({});

  const [value] = useState<WebViewContextValue>(() => ({
    /**
     * 웹뷰를 등록합니다.
     */
    registerWebView: params => {
      const {webView, id} = params;
      webViewRef.current[id] = webView;
    },
    getAllWebView: () => webViewRef.current,
    getWebView: webViewId => webViewRef.current[webViewId],
  }));

  return (
    <WebViewContext.Provider value={value}>{children}</WebViewContext.Provider>
  );
};

export const useWebViewHandler = () => {
  const webViewHandler = useContext(WebViewContext);

  if (!webViewHandler) {
    throw new Error('webViewHandler가 정의되지 않았습니다.');
  }

  return webViewHandler;
};
