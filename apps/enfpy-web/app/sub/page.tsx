"use client";

import { Header } from "@vrew/ui";
import { BridgeActions } from "@vrew/modules/web-bridge/types";
import {
  createRequestMessage,
  postRequestMessageToApp,
} from "@vrew/modules/web-bridge/utils/message";

export default function Page(): JSX.Element {
  const handleGoBack = () => {
    const requestMessage = createRequestMessage(
      BridgeActions.NAVIGATION_GO_BACK
    );
    postRequestMessageToApp(requestMessage);
  };

  return (
    <>
      <Header text="SUB" />
      <h2>sub</h2>

      <br />
      <br />
      <button type="button" onClick={handleGoBack}>
        go Back
      </button>
      <br />
    </>
  );
}
