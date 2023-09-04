import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {CommonWebView} from '../../components/web-view/CommonWebView';
import {useRoute} from '@react-navigation/native';

export default function LoginScreen() {
  const route = useRoute();
  const webviewRef = useRef<WebView>(null);
  const uri = '/' + route.name;

  useEffect(() => {
    console.log('LOGIN_SCREEN');
  }, []);

  return <CommonWebView ref={webviewRef} source={{uri}} />;
}
