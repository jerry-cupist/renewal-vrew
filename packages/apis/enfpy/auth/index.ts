import { AxiosInstance } from "axios";
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

const createAuthApi = (axiosInstance: AxiosInstance) => ({
  /**
   * 로그인 요청
   */
  postSignIn: (data: PostSignInRequest) =>
    axiosInstance.post<PostSignInResponse>("/auth/v1/sign-in", data, {
      headers: {
        Authorization: "",
      },
    }),

  /**
   * refreshToken으로 accessToken갱신
   */
  silentRefresh: (refreshToken: string) =>
    axiosInstance<BaseResponse<UserTokenResponse>>({
      method: "post",
      url: "/auth/v1/token",
      headers: {
        Authorization: `bearer ${refreshToken}`,
      },
    }),
  /**
   * 핸드폰 번호 확인
   * @param data.countryCode "+82"
   * @param data.nationalNumber "1022224444"
   * @param data.phoneNumber "+821089265827"
   */
  postPhoneVerification: (data: PostPhoneVerificationRequest) =>
    axiosInstance.post<PostPhoneVerificationResponse>(
      "/auth/v1/phone-verification",
      data
    ),
});

export type AuthApi = ReturnType<typeof createAuthApi>;

export default createAuthApi;
