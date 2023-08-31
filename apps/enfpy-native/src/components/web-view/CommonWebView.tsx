import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useId,
  useEffect,
} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';
import {useNavigation} from '@react-navigation/native';
import {
  MessageHandler,
  useBridge,
} from '../../contexts/web-bridge/BridgeContext';
import {WEB_URL} from '@env';

export interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri;
}

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  (props, ref) => {
    const id = useId();
    const navigation = useNavigation();
    const {createMessageHandler} = useBridge();

    const webViewRef = useRef<WebView>(null);
    const messageHandlerRef = useRef<MessageHandler | null>(null);

    useImperativeHandle(ref, () => webViewRef.current);

    const initMessageHandler = useCallback(() => {
      if (webViewRef.current && createMessageHandler) {
        messageHandlerRef.current = createMessageHandler({
          id,
          webView: webViewRef.current,
          navigation,
        });
      }
    }, [createMessageHandler, id, navigation]);

    const handleMessage = (e: WebViewMessageEvent) => {
      console.log('message received', JSON.parse(e.nativeEvent.data));
      messageHandlerRef.current?.(e);
    };

    useEffect(() => {
      initMessageHandler();
    }, [initMessageHandler]);

    return (
      <>
        <WebView
          ref={webViewRef}
          source={{uri: WEB_URL + props.source.uri}}
          onMessage={handleMessage}
          style={styles.container}
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
});
