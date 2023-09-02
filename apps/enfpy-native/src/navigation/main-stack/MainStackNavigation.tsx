import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainBottomTabNavigation} from '../main-bottom-tab/MainBottomTabNavigation';
import RootScreen from '../../screens';
import LoginScreen from '../../screens/login';
import ProfileScreen from '../../screens/profile';
import {Screens} from '@vrew/modules/web-bridge/constants/screen-enfpy';
import {FavorSettingScreen} from '../../screens/home/FavorSetting';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Screens.ROOT} component={RootScreen} />
        <Stack.Screen name={Screens.MAIN} component={MainBottomTabNavigation} />
        <Stack.Screen
          name={Screens.HOME_FAVOR_SETTING}
          component={FavorSettingScreen}
        />
        <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Screens.PROFILE} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
