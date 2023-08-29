import {
  CommonActions,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

import {WebBridgeActions} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';
import {ValueOfScreenName} from '@vrew/modules/web-bridge/constants/screen-enfpy';
import WebView from 'react-native-webview';

interface Navigation extends NavigationProp<any> {}

export interface NavigateArg<P = object> {
  screenName: ValueOfScreenName;
  params?: P;
}

export interface PushArgs<P = object> extends NavigateArg<P> {}

export type PopArgs = number | undefined;

export interface ReplaceArgs<P = object> extends NavigateArg<P> {}

export interface ResetState {
  index: number;
  routes: NavigateArg[];
}
export interface ResetArgs extends ResetState {}

export interface OptionArgs {}

export interface NavigationHandlerArgs {
  navigation: Navigation;
  webView: WebView;
}

export const PUSH_INTERVAL = 500;

export const useNavigationHandler = () => {
  const pushTimeStampRef = useRef<number>(0);

  const navigate = useCallback(
    (
      {data}: RequestMessage<NavigateArg>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const {screenName, params} = data;

      navigation.dispatch(CommonActions.navigate(screenName, params));
    },
    [],
  );

  const goBack = useCallback(
    (_: RequestMessage, {navigation}: NavigationHandlerArgs) => {
      navigation.dispatch(CommonActions.goBack());
    },
    [],
  );

  const canGoBack = useCallback(
    (_: RequestMessage, {navigation}: NavigationHandlerArgs) =>
      navigation.canGoBack(),
    [],
  );

  const push = useCallback(
    ({data}: RequestMessage<PushArgs>, {navigation}: NavigationHandlerArgs) => {
      const now = new Date().valueOf();
      if (now - pushTimeStampRef.current >= PUSH_INTERVAL) {
        const {screenName, params} = data;

        navigation.dispatch(StackActions.push(screenName, params));

        pushTimeStampRef.current = now;
      }
    },
    [],
  );

  const popToTop = useCallback(
    (_: RequestMessage, {navigation}: NavigationHandlerArgs) => {
      navigation.dispatch(StackActions.popToTop());
    },
    [],
  );

  const pop = useCallback(
    ({data}: RequestMessage<PopArgs>, {navigation}: NavigationHandlerArgs) => {
      navigation.dispatch(StackActions.pop(data));
    },
    [],
  );

  const replace = useCallback(
    (
      {data}: RequestMessage<ReplaceArgs>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const {screenName, params} = data;

      navigation.dispatch(StackActions.replace(screenName, params));
    },
    [],
  );

  const reset = useCallback(
    (
      {data}: RequestMessage<ResetArgs>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const {index, routes} = data;

      navigation.dispatch(
        CommonActions.reset({
          index,
          routes: routes.map(({screenName, params}) => ({
            name: screenName,
            params,
          })),
        }),
      );
    },
    [],
  );

  const reload = useCallback(
    (_: RequestMessage, {webView}: NavigationHandlerArgs) => {
      webView.reload();
    },
    [],
  );

  const setOptions = useCallback(
    (
      {data}: RequestMessage<OptionArgs>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      navigation.setOptions(data);
    },
    [],
  );

  return {
    [WebBridgeActions.NAVIGATION_NAVIGATE]: navigate,
    [WebBridgeActions.NAVIGATION_GO_BACK]: goBack,
    [WebBridgeActions.NAVIGATION_CAN_GO_BACK]: canGoBack,
    [WebBridgeActions.NAVIGATION_PUSH]: push,
    [WebBridgeActions.NAVIGATION_POP_TO_TOP]: popToTop,
    [WebBridgeActions.NAVIGATION_POP]: pop,
    [WebBridgeActions.NAVIGATION_REPLACE]: replace,
    [WebBridgeActions.NAVIGATION_RESET]: reset,
    [WebBridgeActions.NAVIGATION_RELOAD]: reload,
    [WebBridgeActions.NAVIGATION_SET_OPTIONS]: setOptions,
  };
};
