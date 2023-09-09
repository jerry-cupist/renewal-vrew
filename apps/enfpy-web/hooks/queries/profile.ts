import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory'
import enfpyApiClient from '../../apis'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { GetProfileResponse } from '@vrew/apis/enfpy/user'
import useAuth from '../useAuth'

export const profileKeys = createQueryKeys('profile', {
  myProfile: () => ({
    queryKey: ['me'] as const,
    queryFn: () => enfpyApiClient.user.getProfile().then(({ data }) => data),
  }),
})

export type ProfileQueryKeys = inferQueryKeys<typeof profileKeys>

export const useProfile = <T = GetProfileResponse | null>(
  _options?: UseQueryOptions<
    GetProfileResponse,
    unknown,
    T,
    ProfileQueryKeys['myProfile']['queryKey']
  >,
) => {
  const { enabled = true, ...options } = _options || {}
  const auth = useAuth()

  return useQuery({
    ...profileKeys.myProfile(),
    retry: 1,
    ...options,
    enabled: auth.isSignIn && enabled,
  })
}

export const useUserInfo = () =>
  useProfile({
    select: ({ data }) => data.user,
  })

/**
 * 성향테스트
 */
export const usePersonalityTest = () =>
  useProfile({
    select: ({ data, meta }) => {
      const { personalityTestDetail } = meta.resource
      return data.profile.property?.personalityTestTags?.map(
        testTag => personalityTestDetail[testTag.personalityTestDetailId],
      )
    },
  })

export const useProfileDetail = () =>
  useProfile({
    select: ({ data }) => data.profile,
  })

const defaultImagePath = '/temp'
export const useProfileImage = () =>
  useProfile({
    select: ({ data }) => data.profile.images?.[0].path || defaultImagePath,
  })
