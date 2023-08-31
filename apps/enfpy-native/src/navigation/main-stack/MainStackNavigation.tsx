import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainBottomTabNavigation} from '../main-bottom-tab/MainBottomTabNavigation';
import {ScreenName} from '@vrew/modules/web-bridge/constants/screen-enfpy';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ScreenName.Main}
          component={MainBottomTabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
