import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import {
  GetPersonalityTest,
  PersonalityTestState,
} from '@vrew/apis/enfpy/personality'
import enfpyApiClient from '../../apis'
import useAuth from '../useAuth'

export const personalityKeys = createQueryKeys('personalityTest', {
  get: (state: PersonalityTestState = 'activate') => ({
    queryKey: [state] as const,
    queryFn: enfpyApiClient.personality.getPersonalityTest({
      state,
      version: 'v2',
      limit: 20,
    }),
  }),
})

export type PersonalityQueryKeys = inferQueryKeys<typeof personalityKeys>

/**
 * 성향 테스트 조회
 */
export const usePersonalityTest = <T = GetPersonalityTest[]>(
  options?: UseQueryOptions<
    GetPersonalityTest<'v2'>[],
    unknown,
    T,
    PersonalityQueryKeys['get']['queryKey']
  >,
) => {
  const auth = useAuth()
  const enabled = auth.isSignIn

  return useQuery({
    enabled,
    ...personalityKeys.get('activate'),
    ...options,
  })
}
