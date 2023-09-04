import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../../screens/main/Main';
import Sub from '../../screens/sub/Sub';
import RootScreen from '../../screens';
import LoginScreen from '../../screens/login';
import ProfileScreen from '../../screens/profile';
import {SCREEN_NAME} from '@vrew/modules/enfpyBridge/shared/constants/screen-enfpy';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAME.ROOT}>
        <Stack.Screen name={SCREEN_NAME.ROOT} component={RootScreen} />
        <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAME.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={SCREEN_NAME.MAIN} component={Main} />
        <Stack.Screen name={SCREEN_NAME.SUB} component={Sub} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
