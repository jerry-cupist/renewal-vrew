"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";
import { useAutoLogin } from "../hooks/useAuth";
import enfpyApiUtil from "../apis";

/**
 * 1. 자동 로그인을 요청한다.
 * 2. axios header에 토큰를 업데이트한다.
 */
function SessionLoader({ children }: PropsWithChildren) {
  useAutoLogin();
  const { status, data: session } = useSession();
  const isLogin = !!session && status === "authenticated";
  const token = isLogin ? session.accessToken : "";

  useEffect(() => {
    if (!isLogin || !token) {
      return;
    }

    //Axios Default Header 세팅
    enfpyApiUtil.apiClient.defaults.headers[
      "Authorization"
    ] = `bearer ${token}`;
  }, [isLogin, token]);

  return <>{children}</>;
}

export default SessionLoader;
