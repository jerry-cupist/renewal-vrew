"use client";

import { Button, Header } from "@vrew/ui";
import MainButton from "../features/main/MainButton";

export default function Page(): JSX.Element {
  const handleClickButton: () => void = () => {
    const tempData = {
      type: "request",
      action: "tempAction",
      request_id: 1,
      data: "encounter",
    };

    (window as any).ReactNativeWebView?.postMessage(JSON.stringify(tempData));
  };
  return (
    <>
      <Header text="ENFPY" />
      <Button />
      <MainButton />

      <br />
      <br />
      <button type="button" onClick={handleClickButton}>
        postMessage 테스트
      </button>
    </>
  );
}
