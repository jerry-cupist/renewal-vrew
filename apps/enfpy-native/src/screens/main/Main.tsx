import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import {CommonWebView} from '../../components/web-view/CommonWebView';
import WebView from 'react-native-webview';

export default function Main() {
  const webviewRef = useRef<WebView>(null);

  return (
    <>
      <View>
        <Text>😃This is main screen.</Text>
      </View>
      <CommonWebView
        ref={webviewRef}
        source={{uri: 'http://localhost:3001/main'}}
      />
    </>
  );
}
