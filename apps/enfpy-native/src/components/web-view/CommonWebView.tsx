import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useId,
  useState,
} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {
  WebViewMessageEvent,
  WebViewSourceUri,
} from 'react-native-webview/lib/WebViewTypes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  MessageHandler,
  useWebViewHandler,
} from '../../contexts/web-bridge/WebViewContext';
import {createRequestMessageHandler} from '../../contexts/web-bridge/handlers';
import useConfig from '../../hooks/useConfig';
import {Fetcher, buildFetcher} from '@vrew/modules/app-bridge/buildFetcher';
import {buildCustomEventManager} from '../../utils/customEvent';

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

export interface CommonWebViewRef {
  webView: WebView;
  fetcher: Fetcher;
}

export const CommonWebView = forwardRef<CommonWebViewRef, CommonWebViewProps>(
  ({source, ...props}, ref) => {
    const id = useId();
    const navigation = useNavigation();
    const [customEventManager] = useState(() => buildCustomEventManager());
    const webViewRef = useRef<WebView>();
    const fetcherRef = useRef<Fetcher>();
    const requestMessageHandler = useRef<MessageHandler>();
    const {registerWebView} = useWebViewHandler();
    const config = useConfig();
    useImperativeHandle(ref, () => ({
      webView: webViewRef.current as WebView,
      fetcher: fetcherRef.current as Fetcher,
    }));

    const uri = isValidUrl(source.uri)
      ? source.uri
      : config.webUrl + source.uri;

    /**
     * screen 전환시 웹뷰가 포커스되지 않는 이슈가 있다.
     */
    useFocusEffect(() => {
      webViewRef?.current?.requestFocus?.();
    });

    const handleMessage = (event: WebViewMessageEvent) => {
      // APP => WEB 요청 응답에 대한 처리
      customEventManager.emit('message', event);

      // WEB => APP 요청에 대한 처리
      requestMessageHandler.current?.(event);
    };

    const onMounted = (webView: WebView) => {
      if (!webView) {
        return;
      }
      requestMessageHandler.current = createRequestMessageHandler({
        id,
        webView: webView,
        navigation,
      });
      webViewRef.current = webView;
      // 외부 핸들링을 위한 확장
      webViewRef.current.addEventListener = customEventManager.addEventListener;
      webViewRef.current.removeEventListener =
        customEventManager.removeEventListener;

      fetcherRef.current = buildFetcher(webViewRef.current);
      registerWebView({id, webView: webViewRef.current});
    };

    return (
      <WebView
        ref={onMounted}
        source={{...source, uri}}
        onMessage={handleMessage}
        style={styles.container}
        {...props}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
});
