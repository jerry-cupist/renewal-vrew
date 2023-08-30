import { AxiosInstance } from "axios";
import apiClient from "../apiClient";
import { BaseResponse } from "../types";

export interface PostSignInRequest {
  phoneVerificationId: number;
  phoneVerificationCode: string;
  loginAccountIdentification: string;
}
export interface PostSignInResponse {
  data: UserTokenResponse;
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

export type UserState =
  | "sign_up_progressing"
  | "review"
  | "active"
  | "dormant"
  | "suspended"
  | "delete_pending"
  | "deleted";

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserTokenResponse extends UserToken {
  userState: UserState;
  userStateMeta: string;
}

class AuthApi {
  private instance: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.instance = client;
  }

  /**
   * 로그인 요청
   */
  postSignIn = (data: PostSignInRequest) =>
    this.instance.post<PostSignInResponse>("/auth/v1/sign-in", data, {
      headers: {
        Authorization: "",
      },
    });

  /**
   * refreshToken으로 accessToken갱신
   */
  silentRefresh = (refreshToken: string) =>
    this.instance.post<BaseResponse<UserTokenResponse>>(
      "/api/enfpy/auth/v1/token",
      undefined,
      {
        headers: {
          Authorization: `bearer ${refreshToken}`,
        },
      }
    );

  /**
   * 핸드폰 번호 확인
   * @param data.countryCode "+82"
   * @param data.nationalNumber "1022224444"
   * @param data.phoneNumber "+821089265827"
   */
  postPhoneVerification = (data: PostPhoneVerificationRequest) =>
    this.instance.post<PostPhoneVerificationResponse>(
      "/auth/v1/phone-verification",
      data
    );
}

export default AuthApi;
