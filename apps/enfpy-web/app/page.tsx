"use client";

import { Header } from "@vrew/ui";
import useAuth from "../hooks/useAuth";
import Anchor from "../components/Anchor";
import { useSession } from "../hooks/server/auth";

export default function Page(): JSX.Element {
  const auth = useAuth();
  const session = useSession();

  return (
    <>
      <Header text="ENFPY" />

      {auth.isLoading ? (
        "로딩중"
      ) : (
        <>
          <h3>
            {auth.isSignIn ? `Hi ${session.data?.user.id}!` : "로그인 하세요"}
          </h3>

          <div>
            {auth.isSignIn && (
              <button onClick={() => auth.signOut()}>로그아웃</button>
            )}
          </div>

          <div>
            <h4>withAuth</h4>
            <ul>
              <li>
                <Anchor href="/profile">프로필 페이지</Anchor>
              </li>
            </ul>
          </div>
          <div>
            <h4>withOutAuth</h4>
            <ul>
              <li>
                <Anchor href="/login">로그인 페이지</Anchor>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
