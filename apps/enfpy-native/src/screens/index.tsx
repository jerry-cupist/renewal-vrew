import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import {CommonWebView} from '../components/web-view/CommonWebView';
import ENFPY_URL from '../constants/screenUrl';

export default function RootScreen() {
  const webviewRef = useRef<WebView>(null);

  return <CommonWebView ref={webviewRef} source={{uri: ENFPY_URL.ROOT.URL}} />;
}
