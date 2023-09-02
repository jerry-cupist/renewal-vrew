import React, {useRef} from 'react';
import {CommonWebView} from '@components/web-view/CommonWebView';
import {
  ScreenPaths,
  Screens,
} from '@vrew/modules/web-bridge/constants/screen-enfpy';
import WebView from 'react-native-webview';

export const FavorSettingScreen = () => {
  const webviewRef = useRef<WebView>(null);
  return (
    <>
      <CommonWebView
        ref={webviewRef}
        source={{uri: ScreenPaths[Screens.HOME_FAVOR_SETTING]}}
      />
    </>
  );
};
