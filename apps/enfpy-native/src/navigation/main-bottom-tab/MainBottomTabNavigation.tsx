import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ScreenName} from '@vrew/modules/web-bridge/constants/screen-enfpy';
import {HomeScreen} from '../../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();

export const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} backBehavior="none">
      <Tab.Screen name={ScreenName.HomeTabScreen} component={HomeScreen} />
    </Tab.Navigator>
  );
};
