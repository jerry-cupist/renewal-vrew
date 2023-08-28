import { Button, Header } from "@vrew/ui";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <>
      <Header text="ENFPY2" />
      <Link href="login">로그인페이지</Link>
    </>
  );
}
