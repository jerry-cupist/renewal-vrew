import { CommonActions, StackActions } from '@react-navigation/native'
import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/commonBridge/appBridge/utils'
import {
  AppBridgeActionDatas,
  AppBridgeReqActions,
} from '@vrew/modules/enfpyBridge/appBrdige/actions'
import { StartWith } from '../../../types/util'

// TODO: 액션타입 추론
const navigate = createMessageHandler<
  'navigation-navigate',
  AppBridgeActionDatas['navigation-navigate']
>(({ data }, { navigation }) => {
  const { screenName, params } = data
  navigation.dispatch(CommonActions.navigate(screenName, params))
})

const goBack = createMessageHandler<
  'navigation-go-back',
  AppBridgeActionDatas['navigation-go-back']
>((_, { navigation }) => {
  navigation.dispatch(CommonActions.goBack())
})

const canGoBack = createMessageHandler<
  'navigation-can-go-back',
  AppBridgeActionDatas['navigation-can-go-back']
>((_, { navigation }) => {
  navigation.canGoBack()
})

const push = createMessageHandler<
  'navigation-push',
  AppBridgeActionDatas['navigation-push']
>(({ data }, { navigation }) => {
  const { screenName, params } = data
  navigation.dispatch(StackActions.push(screenName, params))
})

const popToTop = createMessageHandler<
  'navigation-pop-to-top',
  AppBridgeActionDatas['navigation-pop-to-top']
>((_, { navigation }) => {
  navigation.dispatch(StackActions.popToTop())
})

const pop = createMessageHandler<
  'navigation-pop',
  AppBridgeActionDatas['navigation-pop']
>(({ data }, { navigation }) => {
  navigation.dispatch(StackActions.pop(data))
})

const replace = createMessageHandler<
  'navigation-replace',
  AppBridgeActionDatas['navigation-replace']
>(({ data }, { navigation }) => {
  const { screenName, params } = data

  navigation.dispatch(StackActions.replace(screenName, params))
})

const reset = createMessageHandler<
  'navigation-reset',
  AppBridgeActionDatas['navigation-reset']
>(({ data }, { navigation }) => {
  const { index, routes } = data

  navigation.dispatch(
    CommonActions.reset({
      index,
      routes: routes.map(({ screenName, params }) => ({
        name: screenName,
        params,
      })),
    }),
  )
})

const reload = createMessageHandler<
  'navigation-reload',
  AppBridgeActionDatas['navigation-reload']
>((_, { webView }) => {
  webView.reload()
})

const setOptions = createMessageHandler<
  'navigation-set-options',
  AppBridgeActionDatas['navigation-set-options']
>(({ data }, { navigation }) => {
  navigation.setOptions(data)
})

type NavigationActionPrefix = 'navigation-'
type NavigationActionType = StartWith<
  AppBridgeReqActions,
  NavigationActionPrefix
>

export const navigationHandlers = createMessageHandlers<NavigationActionType>({
  'navigation-navigate': navigate,
  'navigation-can-go-back': canGoBack,
  'navigation-go-back': goBack,
  'navigation-push': push,
  'navigation-pop-to-top': popToTop,
  'navigation-pop': pop,
  'navigation-reload': reload,
  'navigation-replace': replace,
  'navigation-reset': reset,
  'navigation-set-options': setOptions,
})
