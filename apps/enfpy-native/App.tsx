import React from 'react';
import {StatusBar} from 'react-native';
import {WebBridgeProvider} from './src/contexts/web-bridge/WebBridgeContext';
import {MainStackNavigation} from './src/navigation/main-stack/MainStackNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <WebBridgeProvider>
        <MainStackNavigation />
      </WebBridgeProvider>
    </>
  );
};

export default App;
