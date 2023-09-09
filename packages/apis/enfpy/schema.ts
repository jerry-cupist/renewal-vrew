export type Mbti =
  | 'intj'
  | 'intp'
  | 'entj'
  | 'entp'
  | 'infj'
  | 'infp'
  | 'enfj'
  | 'enfp'
  | 'istj'
  | 'isfj'
  | 'estj'
  | 'esfj'
  | 'istp'
  | 'isfp'
  | 'estp'
  | 'esfp'

export type Drinking = 'sometimes' | 'never' | 'often' | 'any'
export type Smoking = 'sometimes' | 'never' | 'often' | 'any'

export type Religion =
  | 'NO_RELIGION'
  | 'CHRISTIAN'
  | 'BUDDHIST'
  | 'CATHOLIC'
  | 'WON_BUDDHIST'
  | 'MUSLIM'
  | 'HINDU'
  | 'JEWISH'
  | 'SIKH'
  | 'ANGLICAN'
  | 'EASTERN_ORTHODOX'
  | 'FOLK_RELIGION'
  | 'OTHER'

export type Interest =
  | 'wine'
  | 'festival'
  | 'gardening'
  | 'karaoke'
  | 'pilates'
  | 'politics'
  | 'religions'
  | 'gym_person'
  | 'watch_performance'
  | 'singing'
  | 'music'
  | 'swimming'
  | 'winter_sports'
  | 'camping'
  | 'surfing'
  | 'hiking'
  | 'baseball'
  | 'ping_pong'
  | 'bouldering'
  | 'billiard'
  | 'badminton'
  | 'yoga'
  | 'tennis'
  | 'basketball'
  | 'soccer'
  | 'golf'
  | 'current_affairs'
  | 'writing'
  | 'dancing'
  | 'fashion'
  | 'reading'
  | 'human_right'
  | 'cooking'
  | 'financial_technology'
  | 'traveling'
  | 'self_improvement'
  | 'walking'
  | 'painting'
  | 'taking_picture'
  | 'drama'
  | 'museums_and_galleries'
  | 'cafe_hopping'
  | 'playing_instrument'
  | 'game'
  | 'information_technology'
  | 'movie'
  | 'cycling'
  | 'voluntary_work'
  | 'animation'
  | 'interior'
  | 'one_day_class'
  | 'gastroventure'
  | 'driving'
  | 'foreign_language'

export type Lifestyle =
  | 'work_from_home'
  | 'wealthy'
  | 'house_owner'
  | 'workaholic'
  | 'outgoing_person'
  | 'enjoy_spending_time_alone'
  | 'vegetarian'
  | 'homebody'
  | 'have_a_furry_animals'
  | 'night_duty'
  | 'work_regular_hours'
  | 'night_owl'
  | 'work_flexible'
  | 'work_on_weekends'
  | 'live_with_my_family'
  | 'dormitory'
  | 'work_on_weekdays'
  | 'live_on_my_own'
  | 'with_room_mate'
  | 'shift_work'
  | 'morning_person'
interface PersonalityTestTag {
  personalityTestId: number
  personalityTestDetailId: number
  personalityTestResultId: number
}

export interface ProfilePropertyResponse {
  mbti: Mbti
  geolocation: string[]
  introduction?: string
  job?: string
  company?: string
  height?: number
  education?: string
  drinking?: Drinking
  smoking?: Smoking
  religion?: Religion
  interests?: Interest[]
  lifestyles?: Lifestyle[]
  mbtiDetail?: {
    score: { [key: string]: number }
    type: {
      public: [Mbti, number]
      private: [string, number]
      sub: [Mbti, number] | null
    }
  }
  personalityTestTags?: PersonalityTestTag[]
}
export interface ProfileImageResponse {
  order: number
  type: string
  path: string // full path
}

export type DesiredMeetingType =
  | 'small_talk'
  | 'nearby_friend'
  | 'relationship'
  | 'not_decided'

export type Gender = 'F' | 'M'

export interface ProfilePreferenceResponse {
  maxAge: number
  minAge: number
  mbtis?: Mbti[]
  desiredMeetingTypes?: DesiredMeetingType[]
  genders?: Gender[]
}

export interface MbtiChemi {
  group: string // 서로 잘 어울리는 사이에요
  score: string // ***
  text: string // 우린 영혼부터 끌리는 사이. 프로 주접러 ESFJ
  tag: string
}

export type Relation = 'not_related' | 'connection' | 'like' | 'rating'

export type SubRelation =
  | 'both_up' // 나와 상대가 업
  | 'rating_up' // 내가 상대를 업
  | 'rated_up' // 상대가 나를 업
  | 'rated' // 내가 상대를 평가(댜운)
  | 'not_rated' // 평가 이력 없음
  // like
  | 'send_like' // 친구 요청 보냄
  | 'receive_like' // 친구 요청 받음
  | 'send_special_like' // 스페셜 좋아요 보냄, Check
  | 'receive_special_like' // 스페셜 좋아요 받음, Check
  // connection
  | 'connected' // 연결됨
  | 'open' // 대화 진행 중
  | 'disconnected' // 연결 해제됨
  | 'rewarded' // 연결 해제됨 (보상 받음)
export interface RelationResponse {
  relation: Relation
  subRelation: SubRelation
  data: RelationData | null
}
export interface ConnectionResponse {
  id: number
  serviceName: string | null
  userId: number
  profileId: number
  userState: string | null
  targetServiceName: string | null
  targetUserId: number
  targetProfileId: number
  targetUserState: string | null
  type: 'un_purchased' | 'free' | 'point'
  state: 'connected' | 'open' | 'disconnected' | 'rewarded'
  chatServerUrl: string // sendbird channel url
  createdAt: string // YYYY-MM-DD HH:mm:ss
  updatedAt: string // YYYY-MM-DD HH:mm:ss
}

export type LikeCategory = 'like' | 'special_like'
export interface LikeResponse {
  id: number
  serviceName: string
  userId: number
  profileId: number
  targetServiceName: string
  targetUserId: number
  targetProfileId: number
  category: LikeCategory
  type: 'paid_point' | 'free_point' | 'free_send_like' | 'reward_send_like'
  direction: 'send' | 'receive'
  message?: string | null
  path?: 'home' | 'ratingTo' | 'ratingFrom' | 'likeTo' | 'likeFrom' | 'etc'
  isRead: boolean
  isDeleted: boolean
  isPassed: boolean
  createdAt: string // YYYY-MM-DD HH:mm:ss
  updatedAt: string // YYYY-MM-DD HH:mm:ss
}

export type ServiceName = 'enfpy'
export type RatingType = 'up' | 'down'

export interface RatingResponse {
  id: number
  serviceName: ServiceName
  userId: number
  profileId: number
  targetServiceName: ServiceName
  targetUserId: number
  targetProfileId: number
  type: RatingType
  isRead: boolean
  isDeleted: boolean
  isPassed: boolean
  createdAt: string // 2023-05-02 11:54:25
  updatedAt: string // 2023-05-02 11:54:25
}

export interface RelationData {
  connection: ConnectionResponse
  likes: LikeResponse[]
  ratings: RatingResponse[]
}
