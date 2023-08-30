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

  useEffect(() => {
    if (session.data && auth.isSignIn) {
      tokenUtil.update(session.data.refreshToken);
    }
  }, [session.data, auth.isSignIn]);

  return <>{children}</>;
};
export default TokenUpdate;
