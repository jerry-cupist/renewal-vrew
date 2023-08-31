import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useId,
  useEffect,
} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';
import {useNavigation} from '@react-navigation/native';
import {
  MessageHandler,
  useWebViewHandler,
} from '../../contexts/web-bridge/WebViewContext';
import {createMessageHandler} from '../../contexts/web-bridge/handlers';

export interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri;
}

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  (props, ref) => {
    const id = useId();
    const navigation = useNavigation();
    const webViewRef = useRef<WebView | null>(null);
    const messageHandler = useRef<MessageHandler>();
    useImperativeHandle(ref, () => webViewRef.current);
    const {registerWebView} = useWebViewHandler();

    useEffect(() => {
      if (webViewRef.current) {
        registerWebView({id, webView: webViewRef.current});
      }
    }, [registerWebView, id]);

    const handleMessage = (e: WebViewMessageEvent) => {
      console.log('message received', JSON.parse(e.nativeEvent.data));
      messageHandler.current?.(e);
    };

    const initWebView = (webView: WebView) => {
      if (webView) {
        messageHandler.current = createMessageHandler({
          id,
          webView: webView,
          navigation,
        });
        webViewRef.current = webView;
      }
    };

    return (
      <WebView
        ref={initWebView}
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
