import enfpyApiClient from '@vrew/apis/enfpy'
import tokenManager from '../utils/tokenUtil'
import { queryClient } from '../context/QueryClientProvider'
import { authKeys, silentRefresh } from '../hooks/queries/auth'

/**
 * apiClient에 대한 환경 설정
 */

enfpyApiClient.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_MAIN_API_HOST,
})

/**
 * 만료시 갱신요청
 * @note axios와 localStorage에 토큰 갱신은 next-auth events.signIn에서 처리됩니다.
 */
enfpyApiClient.addEventListener('onUnauthorizedRequest', async () => {
  const token = tokenManager.get()
  console.log('[onUnauthorizedRequest]', { token })
  if (token.refreshToken) {
    await silentRefresh({ refreshToken: token.refreshToken })

    // 세션 업데이트
    queryClient.resetQueries({
      ...authKeys.session(),
    })
  }
})

export default enfpyApiClient
