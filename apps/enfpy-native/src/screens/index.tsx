import React, { useEffect, useRef } from 'react'
import {
  CommonWebView,
  CommonWebViewRef,
} from '../components/web-view/CommonWebView'

import { View } from 'react-native'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'

export default function RootScreen() {
  const webviewRef = useRef<CommonWebViewRef>(null)

  useEffect(() => {
    if (!webviewRef.current) {
      return
    }

    const { fetcher } = webviewRef.current

    fetcher({
      url: '/health-check',
      method: 'get',
    })
      .then(res => {
        console.log('[NETWORK]_RES: ', { res })
      })
      .catch((error: unknown) => {
        console.log('[NETWORK]_ERROR: ', { error })
      })
  }, [])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CommonWebView ref={webviewRef} source={{ uri: ENFPY_WEB_URL.ROOT }} />
    </View>
  )
}
