"use client";

import { Header } from "@vrew/ui";
import { ChangeEvent, useState } from "react";
import { useNavigation } from "../../hooks/navigation/useNavigation";
import { useDev } from "@vrew/modules/web-bridge/hooks/useDev";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const dev = useDev();

  const [logMessage, setLogMessage] = useState("log message");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressLogButton = () => {
    dev.consoleLog({ message: logMessage });
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
