"use client";

import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import useAuth from "../hooks/useAuth";
import tokenUtil from "../utils/tokenUtil";

/**
 * 세션에 갱신된 토큰을 LocalStorage에 저장한다.
 */
const TokenUpdate = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const auth = useAuth();
  const isUnauthenticated =
    !session.data && session.status === "unauthenticated";

  /**
   * localStorage에 refreshToken갱신
   */
  useEffect(() => {
    if (session.data && auth.isSignIn) {
      tokenUtil.update(session.data.refreshToken);
    }
  }, [session.data, auth.isSignIn]);

  /**
   * 앱 시작시점에 session이 없는 경우 silentRefresh 요청
   * @todo 현재 auth.silentRefresh에서 400에러 반환되고 있음 확인 필요
   */
  useEffect(() => {
    const token = tokenUtil.get();
    const refreshToken = token.refreshToken;

    if (isUnauthenticated && refreshToken) {
      tokenUtil.delete();
      console.log("try silentRefresh");

      // TODO: 400에서 확인 필요 message:invalid_request_error
      // auth.silentRefresh(refreshToken, {
      //   redirect: false,
      // });
    }
  }, [isUnauthenticated, auth.silentRefresh]);

  return <>{children}</>;
};
export default TokenUpdate;
