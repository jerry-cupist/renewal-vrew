import React, {forwardRef, useRef, useImperativeHandle, useId} from 'react';
import WebView, {WebViewMessageEvent, WebViewProps} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  MessageHandler,
  useWebViewHandler,
} from '../../contexts/web-bridge/WebViewContext';
import {createMessageHandler} from '../../contexts/web-bridge/handlers';
import useConfig from '../../hooks/useConfig';

export interface CommonWebViewProps extends WebViewProps {
  source: WebViewSourceUri;
}

/**
 * TODO: 정규식으로 바꾸기
 */
const isValidUrl = (url: string) => {
  // const regExp =
  //   /(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
  // return regExp.test(url);

  return url.startsWith('http');
};

export const CommonWebView = forwardRef<any, CommonWebViewProps>(
  ({source}, ref) => {
    const id = useId();
    const navigation = useNavigation();
    const webViewRef = useRef<WebView | null>(null);
    const messageHandler = useRef<MessageHandler>();
    useImperativeHandle(ref, () => webViewRef.current);
    const {registerWebView} = useWebViewHandler();
    const config = useConfig();

    const uri = isValidUrl(source.uri)
      ? source.uri
      : config.webUrl + source.uri;

    /**
     * screen 전환시 웹뷰가 포커스되지 않는 이슈가 있다.
     */
    useFocusEffect(() => {
      webViewRef?.current?.requestFocus?.();
    });

    const handleMessage = (e: WebViewMessageEvent) => {
      const message = JSON.parse(e.nativeEvent.data);
      console.log('🟢[WEBVIEW][MESSAGE][RECEIVE]', {message});
      messageHandler.current?.(e);
    };

    const onMounted = (webView: WebView) => {
      if (!webView) {
        return;
      }
      messageHandler.current = createMessageHandler({
        id,
        webView: webView,
        navigation,
      });
      webViewRef.current = webView;

      registerWebView({id, webView: webViewRef.current});
    };

    return (
      <WebView
        ref={onMounted}
        source={{...source, uri}}
        onMessage={handleMessage}
        style={styles.container}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
});
