import enfpyApiClient from "@vrew/apis/enfpy";
import tokenUtil from "../utils/tokenUtil";
import { signIn } from "next-auth/react";
import { CREDENTIALS_TYPE } from "../app/api/auth/[...nextauth]/route";

/**
 * apiClient에 대한 환경 설정
 */

enfpyApiClient.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_MAIN_API_HOST,
});

/**
 * 만료시 갱신요청
 * @note axios와 localStorage에 토큰 갱신은 next-auth events.signIn에서 처리됩니다.
 */
enfpyApiClient.addEventListener("onUnauthorizedRequest", () => {
  const token = tokenUtil.get();
  tokenUtil.delete();
  if (!token.refreshToken) {
    return;
  }

  signIn(CREDENTIALS_TYPE.TOKEN, {
    refreshToken: token.refreshToken,
  });
});

export default enfpyApiClient;
