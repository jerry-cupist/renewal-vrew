import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/screens/main/Main';
import Sub from './src/screens/sub/Sub';
import {BridgeProvider} from './src/contexts/bridge/BridgeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <BridgeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="main" component={Main} />
            <Stack.Screen name="sub" component={Sub} />
          </Stack.Navigator>
        </NavigationContainer>
      </BridgeProvider>
    </>
  );
};

export default App;
