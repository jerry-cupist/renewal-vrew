"use client";

import { Header } from "@vrew/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage(): JSX.Element {
  const session = useSession();

  return (
    <>
      <Header text="Profile" />
      <Link href="/" />

      <h1>accessToken</h1>
      <div>{session.data?.accessToken}</div>
    </>
  );
}
