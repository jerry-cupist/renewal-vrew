import { createApis } from '../../utils/createApi'

export interface PersonalityTest {
  id: number
  name: string
  title: string
  linkSelf: string
  linkTarget: string
  linkMarketing: string
  state: 'activate' | 'inactivate'
  adminId: number
  notificationInAppMessage: string | null
  notificationInAppStartAt: string | null
  notificationInAppEndAt: string | null
  notificationInAppImagePath: string | null
  notificationPushMessage: string | null
  notificationPushStartAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PersonalityTestDetail {
  id: number
  personalityTestId: number
  name: string
  title: string
  subtitle: string
  backgroundColorCode: string
  fontColorCode: string
  imagePath: string
  linkSelf: string
  linkTarget: string
  createdAt: Date
  updatedAt: Date
}

interface ResourceMeta {
  resource: {
    religion: Record<string, string>
    interest: Record<string, string>
    lifestyle: Record<string, string>
    personalityTestDetail: Record<string, PersonalityTestDetail>
  }
}

interface PersonalityTestResult {
  id: number
  userId: number
  profileId: number
  personalityTestId: number
  personalityTestDetailId: number
  createdAt: string
  updatedAt: string
}

export interface PostPersonalityTestData {
  personalityTestDetailName: string
}

export interface PostPersonalityTestArgs extends PostPersonalityTestData {}

export type PersonalityTestState = 'activate' | 'deactivate'
export interface GetPersonalityTestArgs<Version extends 'v1' | 'v2'> {
  state?: PersonalityTestState
  /**
   * v2 성향테스트 탭 메뉴화에서부터 사용됨
   */
  version?: Version

  /**
   * 1회 조회시 리스트 길이
   * @version v2
   */
  limit?: Version extends 'v2' ? number : undefined

  /**
   * 마지막 조회했던 리스트 아이템의 id
   * @version v2
   */
  cursor?: Version extends 'v2' ? number : undefined
}

type Nullable<T> = T | null

export interface GetPersonalityTest<Version extends 'v1' | 'v2' = 'v1'> {
  id: number
  name: string
  title: string
  linkSelf: string
  linkTarget: string
  linkMarketing: string
  state: PersonalityTestState
  adminId: number
  notificationInAppMessage: Nullable<string>
  notificationInAppStartAt: Nullable<string>
  notificationInAppEndAt: Nullable<string>
  notificationInAppImagePath: Nullable<string>
  notificationPushMessage: Nullable<string>
  notificationPushStartAt: Nullable<string>
  createdAt: string
  updatedAt: string
  thumbnailPath: Version extends 'v2' ? Nullable<string> : undefined
  subtitle: Version extends 'v2' ? string : undefined
}

export interface GetPersonalityTestResponse<
  Version extends 'v1' | 'v2' = 'v1',
> {
  data: GetPersonalityTest<Version>[]
  meta: Version extends 'v2'
    ? {
        hasNext: boolean
      }
    : undefined
}

export interface GetPersonalityTestResultArgs {
  profileId: number
}

export interface GetPersonalityTestResultResponse {
  data: PersonalityTestResult[]
  meta: ResourceMeta
}

const personalityApis = createApis(apiClient => ({
  getPersonalityTest: <Version extends 'v1' | 'v2' = 'v1'>({
    version,
    ...args
  }: GetPersonalityTestArgs<Version> = {}) =>
    apiClient<GetPersonalityTestResponse<Version>>({
      method: 'get',
      url: `/personality-test/${version || 'v1'}`,
      params: { state: 'activate', ...args },
    }),
  getPersonalityTestResult: ({ profileId }: GetPersonalityTestResultArgs) =>
    apiClient<GetPersonalityTestResultResponse>({
      url: `/personality-test/v1/profile/${profileId}`,
    }),
}))

export type PersonalityAPis = ReturnType<typeof personalityApis>
export default personalityApis
