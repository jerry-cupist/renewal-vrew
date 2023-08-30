import React from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from './src/navigation/main-stack/MainStackNavigation';
import {BridgeProvider} from './src/contexts/web-bridge/BridgeContext';

const App = () => {
  return (
    <BridgeProvider>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <MainStackNavigation />
    </BridgeProvider>
  );
};

export default App;
