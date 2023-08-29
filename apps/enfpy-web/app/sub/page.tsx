"use client";

import { Header } from "@vrew/ui";
import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from "@vrew/modules/web-bridge/types/action";
import {
  createRequestMessage,
  postRequestMessageToApp,
} from "@vrew/modules/web-bridge/utils/message";
import { ChangeEvent, useState } from "react";

export default function Page(): JSX.Element {
  const [logMessage, setLogMessage] = useState("log message");

  const handleGoBack = () => {
    const requestMessage =
      createRequestMessage<WebBridgeActionDatas.NAVIGATION_GO_BACK>(
        WebBridgeActions.NAVIGATION_GO_BACK,
        undefined
      );
    postRequestMessageToApp(requestMessage);
  };

  const handlePressLogButton = () => {
    const requestMessage =
      createRequestMessage<WebBridgeActionDatas.DEV_CONSOLE_LOG>(
        WebBridgeActions.DEV_CONSOLE_LOG,
        { message: logMessage }
      );
    postRequestMessageToApp(requestMessage);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setLogMessage(e.target.value);
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
      <br />
      <input
        type="text"
        value={logMessage}
        onChange={handleChangeMessage}
        style={{ borderWidth: 1, display: "block" }}
      />
      <button type="button" onClick={handlePressLogButton}>
        show on console
      </button>
      <br />
    </>
  );
}
