"use client";

import { Header } from "@vrew/ui";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Page(): JSX.Element {
  const auth = useAuth();

  return (
    <>
      <Header text="ENFPY" />

      {auth.isLoading ? (
        "로딩중"
      ) : (
        <>
          <h3>you are {auth.isSignIn ? "user" : "guest"}</h3>
          <ul>
            <li>
              {auth.isSignIn ? (
                <>
                  <Link href="profile">프로필 페이지</Link>
                  <button onClick={() => auth.signOut()}>로그아웃</button>
                </>
              ) : (
                <Link href="login">로그인 페이지</Link>
              )}
            </li>
          </ul>
        </>
      )}
    </>
  );
}
