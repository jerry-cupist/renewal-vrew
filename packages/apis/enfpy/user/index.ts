import { AxiosRequestConfig } from "axios";
import apiClient from "../apiClient";
import { PersonalityTest, PersonalityTestDetail } from "../personality";
import {
  MbtiChemi,
  ProfileImageResponse,
  ProfilePreferenceResponse,
  ProfilePropertyResponse,
  RelationResponse,
} from "../schema";

export interface ResourceMetaResponse {
  religion: Record<string, string>;
  interest: Record<string, string>;
  lifestyle: Record<string, string>;
  personalityTest: Record<string, PersonalityTest>;
  personalityTestDetail: Record<string, PersonalityTestDetail>;
}

export interface ProfileResponse {
  id: number;
  userId: number;
  nickname: string | null;
  birthday: string | null; // 1992-05-13
  age: number | null;
  gender: "F" | "M" | null;
  type: "default" | null;
  attractiveScore: number; // 0 ~ 100
  country: "KR" | null;
  currentCountry: "KR" | null;
  property: ProfilePropertyResponse | null;
  images: ProfileImageResponse[] | null;
  preference: ProfilePreferenceResponse | null;
  isDeleted: boolean;
  isIntroduceActive: boolean;
  createdAt: string; // YYYY-MM-DD HH:mm:ss
  updatedAt: string | null; // YYYY-MM-DD HH:mm:ss
}

export interface ProfileWithProfileExtraMetaResponse extends ProfileResponse {
  distance?: number | null;
  mbtiChemi: MbtiChemi;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface UserResponse {
  id: number;
  notificationSettings: null;
  blockSettings: null;
  location: UserLocation;
  state:
    | "sign_up_progressing"
    | "review"
    | "active"
    | "dormant"
    | "suspended"
    | "delete_pending"
    | "deleted";
  createdAt: string; // YYYY-MM-DD HH:mm:ss
  updatedAt: string; // YYYY-MM-DD HH:mm:ss
  lastActivityAt: string; // YYYY-MM-DD HH:mm:ss
}

export interface ProfileData {
  profile: ProfileWithProfileExtraMetaResponse;
  user: UserResponse;
  relation: RelationResponse;
}

export interface GetProfileResponse {
  data: ProfileData;
  meta: { resource: ResourceMetaResponse };
}

/**
 * me의 경우 내 정보 조회
 */
const getProfile = (
  profileId: number | string | "me" = "me",
  config?: AxiosRequestConfig<any>
) => apiClient.get<GetProfileResponse>(`/user/v1/profile/${profileId}`, config);

const userAPis = {
  getProfile,
};

export default userAPis;
