import { useRouter } from 'next/navigation'
import { NavigateOptions as _NavigateOptions } from 'next/dist/shared/lib/app-router-context'
import CONFIG from '../../constant/config'
import { useCallback } from 'react'
import { NavigateArg } from '@vrew/modules/commonBridge/appBridge/types/data/navigation'
import { useBridgeMessageCreator } from '@vrew/modules/enfpyBridge/appBrdige/hooks/useBridgeMessageCreator'
import { convertToScreenNameFromWebUrl } from '@vrew/modules/enfpyBridge/shared/constants/screen-enfpy'
import { EnfpyWebPathnameType } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'
import { isScreen } from './config'

interface NavigateOptions extends _NavigateOptions {
  /** RN에서만 전달된다. */
  params?: NavigateArg['params']
}

/**
 *
 * TODO: goBack에 분기처리
 */
export const useNavigation = () => {
  const bridge = useBridgeMessageCreator()
  const router = useRouter()
  const appNavigate = bridge.navigation.navigate

  /**
   * TODO: pathname 타입추론 가능하도록 변경하기
   */
  const navigate = useCallback(
    (
      href: string,
      options?: NavigateOptions,
      // args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
    ) => {
      router.push(href, options)

      const url = new URL(href, location.origin)
      const pathname = url.pathname

      // 스크린으로 지정한 경우에만
      if (CONFIG.IS_WEBVIEW && isScreen(pathname)) {
        const { params } = options || {}
        const screenName = convertToScreenNameFromWebUrl(
          href as EnfpyWebPathnameType,
        )

        appNavigate({
          screenName,
          params,
        })
        return
      }

      router.push(href, options)
    },
    [appNavigate, router],
  )

  const goBack = bridge.navigation.goBack

  return { navigate, goBack }
}
