import enfpyApiClient from '../apis'
import storeUtil from './storeUtil'

interface TokenType {
  refreshToken: string
  accessToken: string
}

const tokenManager = {
  update(token: TokenType) {
    storeUtil.set('token', {
      refreshToken: token.refreshToken,
    })
    enfpyApiClient.updateToken(token.accessToken)
    // TODO RN에 토큰 동기화
    // return postMessage('token',token)
  },
  delete() {
    storeUtil.remove('token')
    enfpyApiClient.deleteToken()
  },

  get() {
    return storeUtil.get('token', {}) as TokenType
  },
}

export default tokenManager
