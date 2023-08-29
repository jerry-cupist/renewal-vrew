"use client";

import { Header } from "@vrew/ui";
import { calculateDDay } from "../../utils/dayUtil";
import { BridgeActions } from "@vrew/modules/web-bridge/types";

export default function Page(): JSX.Element {
  const dDay = calculateDDay("2023-09-01T00:00:00", "2023-09-15T00:00:00");

  const handleClickButton: () => void = () => {
    const tempData = {
      type: "request",
      action: BridgeActions.NAVIGATION_NAVIGATE,
      request_id: 1,
      data: "encounter",
    };

    (window as any).ReactNativeWebView?.postMessage(JSON.stringify(tempData));
  };

  return (
    <>
      <Header text="MAIN" />
      <h2>main</h2>
      <p>{dDay}</p>

      <br />
      <br />
      <button type="button" onClick={handleClickButton}>
        postMessage 테스트
      </button>
      <br />
    </>
  );
}
