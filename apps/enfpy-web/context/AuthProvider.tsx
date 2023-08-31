"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

/**
 * 서버 컴포넌트에서 Provider를 직접 사용할 수 없는 제약사항 때문에
 * 클라이언트 컴포넌트로 한번 감싸는 용도
 */
const AuthProvider = ({ children }: PropsWithChildren) => (
  <SessionProvider>{children}</SessionProvider>
);
export default AuthProvider;
