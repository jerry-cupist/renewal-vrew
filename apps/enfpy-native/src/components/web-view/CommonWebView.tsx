import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useId,
  useEffect,
} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';
import {StyleSheet} from 'react-native';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';
import {MessageHandler, useBridge} from '../../contexts/bridge/BridgeContext';
import {useNavigation} from '@react-navigation/native';

export interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri;
}

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  (props, ref) => {
    const id = useId();
    const navigation = useNavigation();

    const webViewRef = useRef<WebView>(null);
    const messageHandlerRef = useRef<MessageHandler | null>(null);
    const {createMessageHandler} = useBridge();

    useImperativeHandle(ref, () => webViewRef.current);

    const initReactNativeBridge = useCallback(() => {
      if (webViewRef.current && createMessageHandler) {
        messageHandlerRef.current = createMessageHandler({
          id,
          webView: webViewRef.current,
          navigation,
        });
      }
    }, [createMessageHandler, id, navigation]);

    const handleMessage = (e: WebViewMessageEvent) => {
      const {
        nativeEvent: {data: messageData},
      } = e;
      const message: RequestMessage = JSON.parse(messageData);
      console.log('message received', message);

      messageHandlerRef.current?.(e);
    };

    useEffect(() => {
      initReactNativeBridge();
    }, [initReactNativeBridge]);

    return (
      <WebView
        ref={webViewRef}
        source={props.source}
        onMessage={handleMessage}
        style={styles.container}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
});
