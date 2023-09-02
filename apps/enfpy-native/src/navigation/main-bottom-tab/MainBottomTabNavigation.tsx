import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Screens} from '@vrew/modules/web-bridge/constants/screen-enfpy';
import {HomeScreen} from '../../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();

export const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} backBehavior="none">
      <Tab.Screen name={Screens.HOME} component={HomeScreen} />
    </Tab.Navigator>
  );
};
