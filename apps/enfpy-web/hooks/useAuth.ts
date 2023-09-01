"use client";
import { PostSignInRequest } from "@vrew/apis/enfpy/auth";
import { SignInOptions, signIn, signOut } from "next-auth/react";
import { CREDENTIALS_TYPE } from "../app/api/auth/[...nextauth]/route";
import ENPFY_URL from "../constant/url";
import tokenUtil from "../utils/tokenUtil";
import { useNavigation } from "./navigation/useNavigation";
import { useCallback } from "react";
import { useSession } from "./server/auth";

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
      throw Error(
        `[SILENT_REFRESH] ${data?.error || "로그인 요청중 에러가 발생했습니다"}`
      );
    }
  });

/**
 * 토큰으로 로그인 처리
 * @param silentRefresh
 */
export const silentRefresh = async (
  refreshToken: string,
  options: SignInOptions = {}
) => {
  tokenUtil.delete();
  const response = await signIn(
    CREDENTIALS_TYPE.TOKEN,
    {
      callbackUrl: ENPFY_URL.ROOT,
      redirect: false,
      ...options,
    },
    { refreshToken }
  );

  if (response?.error) {
    const errorMessage = response?.error || "로그인 요청중 에러가 발생했습니다";
    throw Error(errorMessage);
  }
};

const useAuth = () => {
  const navigation = useNavigation();
  const session = useSession();
  const isSignIn = Boolean(session.data?.expires);
  const refetchSession = session.refetch;

  const _signOut = useCallback(
    async (callbackUrl: string = ENPFY_URL.ROOT) => {
      await signOut({
        redirect: false,
      });

      navigation.navigate(callbackUrl);
      return refetchSession();
    },

    [refetchSession]
  );

  const _signIn = useCallback(
    async (params: PostSignInRequest, options: SignInOptions = {}) => {
      await signInWithPhone(params, options);
      return refetchSession();
    },
    [refetchSession]
  );

  const _silentRefresh = useCallback(
    async (refreshToken: string) => {
      await silentRefresh(refreshToken);
      return refetchSession();
    },
    [refetchSession]
  );

  return {
    isSignIn,
    signIn: _signIn,
    signOut: _signOut,
    silentRefresh: _silentRefresh,
    isLoading: session.isLoading,
    isRefetching: session.isRefetching,
  };
};

export default useAuth;
