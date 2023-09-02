import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {CommonWebView} from '../../components/web-view/CommonWebView';
import {
  ScreenPaths,
  Screens,
} from '@vrew/modules/web-bridge/constants/screen-enfpy';

export default function LoginScreen() {
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    console.log('LOGIN_SCREEN');
  }, []);

  return (
    <CommonWebView
      ref={webviewRef}
      source={{uri: ScreenPaths[Screens.LOGIN]}}
    />
  );
}
