"use client";
import { PostSignInRequest, UserToken } from "@vrew/apis/enfpy/auth";
import {
  SignInOptions,
  SignInResponse,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { CREDENTIALS_TYPE } from "../app/api/auth/[...nextauth]/route";
import ENPFY_URL from "../constant/url";
import tokenUtil from "../utils/tokenUtil";

const handleSignInFailure = (data: SignInResponse) => {
  console.error(data.error);
  tokenUtil.delete();
};

const signInWithPhone = (
  params: PostSignInRequest,
  options: SignInOptions = {}
) =>
  signIn(
    CREDENTIALS_TYPE.TELEPHONE,
    {
      callbackUrl: ENPFY_URL.ROOT,
      redirect: false,
      ...options,
    },
    {
      phoneVerificationId: params.phoneVerificationId.toString(),
      phoneVerificationCode: params.phoneVerificationCode,
      loginAccountIdentification: params.loginAccountIdentification,
    }
  ).then((data) => {
    if (data?.error) {
      handleSignInFailure(data);
    }

    return data;
  });

/**
 * 토큰으로 로그인 처리
 * @param silentRefresh
 */
const silentRefresh = (refreshToken: string, options: SignInOptions = {}) =>
  signIn(
    CREDENTIALS_TYPE.TOKEN,
    {
      callbackUrl: ENPFY_URL.ROOT,
      redirect: false,
      ...options,
    },
    { refreshToken }
  ).then((data) => {
    if (data?.error) {
      handleSignInFailure(data);
    }

    return data;
  });

const useAuth = () => {
  const session = useSession();
  const isSignIn =
    Boolean(session.data?.accessToken) && session.status === "authenticated";
  const isLoading = session.status === "loading";

  return {
    isSignIn,
    signIn: signInWithPhone,
    silentRefresh,
    signOut,
    isLoading,
  };
};

export default useAuth;
