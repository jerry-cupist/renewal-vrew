"use client";
import { PostSignInRequest } from "@vrew/apis/enfpy/auth";
import {
  SignInOptions,
  SignInResponse,
  signIn,
  signOut,
} from "next-auth/react";
import { CREDENTIALS_TYPE } from "../app/api/auth/[...nextauth]/route";
import ENPFY_URL from "../constant/url";
import tokenUtil from "../utils/tokenUtil";
import { useNavigation } from "./navigation/useNavigation";
import { useCallback } from "react";
import { useSession } from "./server/auth";

const handleSignInFailure = (data: SignInResponse) => {
  console.error(data.error);
  tokenUtil.delete();
  throw new Error(data?.error || "로그인 요청중 에러가 발생했습니다");
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
    CREDENTIALS_TYPE.REFRESH_TOKEN,
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
  const navigation = useNavigation();
  const session = useSession();
  const isSignIn = Boolean(session.data?.expires);
  const refetchSession = session.refetch;

  const _signOut = useCallback(
    (callbackUrl: string = ENPFY_URL.ROOT) =>
      signOut({
        redirect: false,
      }).then(() => {
        refetchSession();
        navigation.navigate(callbackUrl);
      }),
    [refetchSession]
  );

  return {
    isSignIn,
    signIn: signInWithPhone,
    silentRefresh,
    signOut: _signOut,
    isLoading: session.isLoading,
    isRefetching: session.isRefetching,
  };
};

export default useAuth;
