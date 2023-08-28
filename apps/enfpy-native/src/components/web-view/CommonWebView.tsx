import React, {forwardRef} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {
  WebViewMessage,
  WebViewSourceUri,
} from 'react-native-webview/lib/WebViewTypes';

export enum WebBridgeActions {
  NAVIGATION_NAVIGATE = 'navigation-navigate',
}

export interface WebViewMessageData<D = any> {
  type: 'request' | 'response' | 'event' | 'error';
  action: WebBridgeActions;
  request_id: number;
  data: D;
}

interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri;
}

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  (props, ref) => {
    const handleMessage = (nativeEvent: WebViewMessage) => {
      const {data} = nativeEvent;
      const messageData: WebViewMessageData<string> = JSON.parse(data);

      console.log(messageData.action, messageData.data);
    };

    return (
      <>
        <WebView
          source={props.source}
          style={{flex: 1}}
          onMessage={(e: WebViewMessageEvent) => handleMessage(e.nativeEvent)}
        />
      </>
    );
  },
);
