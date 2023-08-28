import apiClient from "../apiClient";
import { BaseResponse } from "../types";

export interface PostSignInRequest {
  phoneVerificationId: number;
  phoneVerificationCode: string;
  loginAccountIdentification: string;
}
export interface PostSignInResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    userState: string;
    userStateMeta: string;
  };
}

export interface PostPhoneVerificationRequest {
  countryCode: string;
  nationalNumber: string;
  phoneNumber: string;
}
export interface PostPhoneVerificationResponse {
  data: {
    phoneVerificationId: number;
    phoneNumber: string;
  };
}

/**
 * 핸드폰 번호 확인
 * @param data.countryCode "+82"
 * @param data.nationalNumber "1022224444"
 * @param data.phoneNumber "+821089265827"
 */
const postPhoneVerification = (data: PostPhoneVerificationRequest) =>
  apiClient.post<PostPhoneVerificationResponse>(
    "/auth/v1/phone-verification",
    data
  );

export interface UserTokenResponse {
  accessToken: string;
  refreshToken: string;
  userState:
    | "sign_up_progressing"
    | "review"
    | "active"
    | "dormant"
    | "suspended"
    | "delete_pending"
    | "deleted";
  userStateMeta: string | null;
}

/**
 * refreshToken으로 accessToken갱신
 */
const silentRefresh = (refreshToken: string) =>
  apiClient.post<BaseResponse<UserTokenResponse>>(
    "/api/enfpy/auth/v1/token",
    undefined,
    {
      headers: {
        Authorization: `bearer ${refreshToken}`,
      },
    }
  );

/**
 * 로그인 요청
 */
const postSignIn = (data: PostSignInRequest) =>
  apiClient.post<PostSignInResponse>("/auth/v1/sign-in", data);

const authApis = { postSignIn, postPhoneVerification, silentRefresh };

export default authApis;
