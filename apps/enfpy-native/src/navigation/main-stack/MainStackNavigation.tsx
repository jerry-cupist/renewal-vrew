import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN_NAME } from '@vrew/modules/enfpyBridge/shared/constants/screen-enfpy'
// import IntroStack from '../intro-stack'
// import RootScreen from '../../screens'
import IntroScreen from '../../screens/intro'
import LoginScreen from '../../screens/intro/login'
// import Main from '../../screens/main/Main'
// import Sub from '../../screens/sub/Sub'
// import ProfileScreen from '../../screens/profile'

const Stack = createNativeStackNavigator()

/**
 * @note 애니메이션을 이용한 스크린 전환이 필요한 page depth가 있는 경우에만 스크린을 추가한다.
 */
export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.INTRO}
        screenOptions={{ headerShown: true, animation: 'simple_push' }}
      >
        <Stack.Screen name={SCREEN_NAME.INTRO} component={IntroScreen} />
        <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
        {/* <Stack.Screen name={SCREEN_NAME.INTRO} component={IntroStack} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.ROOT} component={RootScreen} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.CHAT_LIST} component={LoginScreen} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.STATION} component={LoginScreen} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.PROFILE} component={ProfileScreen} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.MAIN} component={Main} /> */}
        {/* <Stack.Screen name={SCREEN_NAME.SUB} component={Sub} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
