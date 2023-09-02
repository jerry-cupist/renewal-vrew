import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../../screens/main/Main';
import Sub from '../../screens/sub/Sub';
import RootScreen from '../../screens';
import LoginScreen from '../../screens/login';
import ProfileScreen from '../../screens/profile';
import {ScreenName} from '@vrew/modules/web-bridge/constants/screen-enfpy';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.Root}>
        <Stack.Screen name={ScreenName.Root} component={RootScreen} />
        <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
        <Stack.Screen name={ScreenName.Profile} component={ProfileScreen} />
        <Stack.Screen name={ScreenName.Main} component={Main} />
        <Stack.Screen name={ScreenName.Sub} component={Sub} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
