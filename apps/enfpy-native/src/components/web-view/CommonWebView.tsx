import React from 'react';

import WebView from 'react-native-webview';

export const CommonWebView = () => {
  return (
    <>
      <WebView source={{uri: '10.0.2.2:3000'}} style={{flex: 1}} />
    </>
  );
};
