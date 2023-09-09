import { Session } from 'next-auth'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import {
  getSession as _getSession,
  signIn,
  SignInOptions,
  SignInResponse,
  signOut,
  SignOutResponse,
} from 'next-auth/react'
import tokenUtil from '../../utils/tokenUtil'
import { PostSignInRequest } from '@vrew/apis/enfpy/auth'
import { CREDENTIALS_TYPE } from '../../app/api/auth/[...nextauth]/route'
import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory'
import { TIME } from '../../constant/time'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'

/**
 * @see https://www.npmjs.com/package/@lukemorales/query-key-factory
 */
export const authKeys = createQueryKeys('auth', {
  session: () => ({
    queryKey: [''] as const,
    queryFn: getSession,
  }),
})
export type AuthQueryKeys = inferQueryKeys<typeof authKeys>

export const getSession = () =>
  _getSession().then(session => {
    if (session?.refreshToken && session.accessToken) {
      tokenUtil.update({
        accessToken: session.accessToken,
        refreshToken: session.accessToken,
      })
    }
    return session
  })

/**
 * @note next-auth에서 제공하는 useSession가 session.update 이후 session이 동기화되지 않는 이슈가 있다.
 * 이 이유로 getSession를 사용한다.
 */
export const useSession = <T = Session | null>(
  options?: UseQueryOptions<
    Session | null,
    unknown,
    T,
    AuthQueryKeys['session']['queryKey']
  >,
) =>
  useQuery({
    ...authKeys.session(),
    cacheTime: TIME.MINUTE * 30,
    ...options,
  })

/**
 * 토큰 조회
 */
export const useToken = () =>
  useSession({
    select: session => {
      if (!session) {
        return null
      }
      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      }
    },
  })

export const useSignOut = (
  options?: UseMutationOptions<
    SignOutResponse,
    unknown,
    { callbackUrl?: string }
  >,
) =>
  useMutation({
    mutationFn: (params?: { callbackUrl?: string } | undefined) =>
      signOut({
        callbackUrl: params?.callbackUrl,
        redirect: false,
      }),
    ...options,
  })

const signInWithPhone = (
  params: PostSignInRequest,
  options: SignInOptions = {},
) =>
  signIn(
    CREDENTIALS_TYPE.TELEPHONE,
    {
      callbackUrl: ENFPY_WEB_URL.ROOT,
      redirect: false,
      ...options,
    },
    {
      phoneVerificationId: params.phoneVerificationId.toString(),
      phoneVerificationCode: params.phoneVerificationCode,
      loginAccountIdentification: params.loginAccountIdentification,
    },
  ).then(data => {
    if (data?.error) {
      throw Error(
        `[SILENT_REFRESH] ${
          data?.error || '로그인 요청중 에러가 발생했습니다'
        }`,
      )
    }

    return data
  })

export const useSignIn = (
  options?: Omit<
    UseMutationOptions<SignInResponse | undefined, unknown, PostSignInRequest>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: signInWithPhone,
    ...options,
  })

/**
 * 토큰으로 로그인 처리
 * @param silentRefresh
 */
export const silentRefresh = async (params: {
  refreshToken: string
  options?: SignInOptions
}) => {
  const { refreshToken, options } = params

  tokenUtil.delete()
  const response = await signIn(
    CREDENTIALS_TYPE.TOKEN,
    {
      callbackUrl: ENFPY_WEB_URL.ROOT,
      redirect: false,
      ...options,
    },
    { refreshToken },
  )

  if (response?.error) {
    const errorMessage = response?.error || '로그인 요청중 에러가 발생했습니다'
    throw Error(errorMessage)
  }
}

export const useSilentRefresh = (
  options?: Omit<
    UseMutationOptions<
      void,
      unknown,
      {
        refreshToken: string
        options?: SignInOptions
      }
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: silentRefresh,
    ...options,
  })
