import React from 'react';
import {StatusBar} from 'react-native';
import {CommonWebView} from './src/components/web-view/CommonWebView';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <CommonWebView source={{uri: 'http://localhost:3000/'}} />
    </>
  );
};

export default App;
