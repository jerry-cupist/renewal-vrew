import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {RequestMessage, BridgeActions} from '@vrew/modules/web-bridge/types';
import {StyleSheet} from 'react-native';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';

export interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri; // WebViewSourceHtml 경우를 의도적으로 배제함
}

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  (props, ref) => {
    const webViewRef = useRef<WebView>(null);

    useImperativeHandle(ref, () => webViewRef.current);

    const handleMessage = ({
      nativeEvent: {data: messageData},
    }: WebViewMessageEvent) => {
      console.log(JSON.parse(messageData));
      const {type, action}: RequestMessage<any> = JSON.parse(messageData);

      // run by type
      switch (type) {
        default:
          () => {};
      }

      // run by action
      switch (action) {
        case BridgeActions.NAVIGATION_NAVIGATE:
          () => {
            console.log('NAVIGATION_NAVIGATE');
          };
      }
    };

    return (
      <WebView
        ref={webViewRef}
        source={props.source}
        style={styles.container}
        onMessage={handleMessage}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
});
