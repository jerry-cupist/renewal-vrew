import React from 'react';
import {StatusBar} from 'react-native';
import {BridgeProvider} from './src/contexts/bridge/BridgeContext';
import {MainStackNavigation} from './src/navigation/main-stack/MainStackNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <BridgeProvider>
        <MainStackNavigation />
      </BridgeProvider>
    </>
  );
};

export default App;
