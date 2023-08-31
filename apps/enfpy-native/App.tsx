import React from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from './src/navigation/main-stack/MainStackNavigation';
import {WebViewContainer} from './src/contexts/web-bridge/WebViewContext';

const App = () => {
  return (
    <WebViewContainer>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <MainStackNavigation />
    </WebViewContainer>
  );
};

export default App;
