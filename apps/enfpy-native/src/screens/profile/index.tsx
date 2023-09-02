import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import {CommonWebView} from '../../components/web-view/CommonWebView';
import {
  ScreenPaths,
  Screens,
} from '@vrew/modules/web-bridge/constants/screen-enfpy';

export default function ProfileScreen() {
  const webviewRef = useRef<WebView>(null);

  return (
    <CommonWebView
      ref={webviewRef}
      source={{uri: ScreenPaths[Screens.PROFILE]}}
    />
  );
}
