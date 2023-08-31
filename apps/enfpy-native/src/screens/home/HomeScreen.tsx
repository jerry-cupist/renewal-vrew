import React, {useRef} from 'react';
import {CommonWebView} from '../../components/web-view/CommonWebView';
import {ScreenName} from '@vrew/modules/web-bridge/constants/screen-enfpy';

import WebView from 'react-native-webview';

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);
  return (
    <>
      <CommonWebView
        ref={webviewRef}
        source={{uri: ScreenName.HomeTabScreen}}
      />
    </>
  );
};
