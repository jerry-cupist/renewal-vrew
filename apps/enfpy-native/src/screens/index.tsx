import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import {CommonWebView} from '@components/web-view/CommonWebView';
import {
  ScreenPaths,
  Screens,
} from '@vrew/modules/web-bridge/constants/screen-enfpy';

/*
TODO: 로그인 상태에 따른 스크린 분기
*/
export default function RootScreen() {
  const webviewRef = useRef<WebView>(null);

  return (
    <CommonWebView ref={webviewRef} source={{uri: ScreenPaths[Screens.ROOT]}} />
  );
}
