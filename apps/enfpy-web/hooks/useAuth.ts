"use client";
import { PostSignInRequest, UserToken } from "@vrew/apis/enfpy/auth";
import { SignInOptions, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { CREDENTIALS_TYPE } from "../app/api/auth/[...nextauth]/route";
import enfpyApiUtil from "../apis";
import ENPFY_URL from "../constant/url";

const signInWithPhone = (
  params: PostSignInRequest,
  options: SignInOptions = {}
) =>
  signIn(
    CREDENTIALS_TYPE.TELEPHONE,
    {
      callbackUrl: ENPFY_URL.ROOT,
      ...options,
    },
    {
      phoneVerificationId: params.phoneVerificationId.toString(),
      phoneVerificationCode: params.phoneVerificationCode,
      loginAccountIdentification: params.loginAccountIdentification,
    }
  ).then((data) => {
    console.log("signInWithPhone", { data });
    if (data?.error) {
      localStorage.removeItem("token");
      console.log("signInWithPhone에 실패했습니다.");

      delete enfpyApiUtil.apiClient.defaults.headers["Authorization"];
    }

    return data;
  });

/**
 * 토큰으로 로그인 처리
 * @param refreshToken
 */
const signInWithToken = (refreshToken: string, options: SignInOptions = {}) =>
  signIn(
    CREDENTIALS_TYPE.TOKEN,
    {
      callbackUrl: ENPFY_URL.ROOT,
      ...options,
    },
    { refreshToken }
  ).then((data) => {
    console.log("signInWithToken", { data });
    if (data?.error) {
      localStorage.removeItem("token");
      console.log("auto-login에 실패했습니다.");
      delete enfpyApiUtil.apiClient.defaults.headers["Authorization"];
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
    signInWithToken,
    signOut,
    isLoading,
  };
};

const requestAutoLogin = () => {
  const jsonString = localStorage.getItem("token") || "{}";
  const token: UserToken = JSON.parse(jsonString) || {};

  if (!token.refreshToken) {
    return;
  }

  return (
    token.refreshToken,
    {
      redirect: false,
    }
  );
};

/**
 * 자동 로그인
 */
export const useAutoLogin = () => {
  const session = useSession();
  const auth = useAuth();

  useEffect(() => {
    requestAutoLogin();
  }, []);

  useEffect(() => {
    if (session.data && auth.isSignIn) {
      const token = {
        accessToken: session.data.accessToken,
        refreshToken: session.data.refreshToken,
      };

      // localStorage에 토큰 저장
      localStorage.setItem("token", JSON.stringify(token));

      // TODO 3. RN에 토큰 동기화
      // postMessage('token',token)
    }
  }, [session.data, auth.isSignIn]);
};

export default useAuth;
