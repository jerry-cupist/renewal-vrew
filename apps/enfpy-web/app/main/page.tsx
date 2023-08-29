"use client";

import { Header } from "@vrew/ui";
import { calculateDDay } from "../../utils/dayUtil";
import { BridgeActions } from "@vrew/modules/web-bridge/types/action";
import {
  createRequestMessage,
  postRequestMessageToApp,
} from "@vrew/modules/web-bridge/utils/message";
import {
  ScreenName,
  ValueOfScreenName,
} from "@vrew/modules/web-bridge/constants/screen-enfpy";

export interface NavigateArg<P = object> {
  screenName: ValueOfScreenName;
  params?: P;
}

export default function Page(): JSX.Element {
  const dDay = calculateDDay("2023-09-01T00:00:00", "2023-09-15T00:00:00");

  const handleClickButton: () => void = () => {
    const requestMessage = createRequestMessage<NavigateArg>(
      BridgeActions.NAVIGATION_NAVIGATE,
      {
        screenName: ScreenName.Sub,
      }
    );
    postRequestMessageToApp(requestMessage);
  };

  return (
    <>
      <Header text="MAIN" />
      <h2>main</h2>
      <p>{dDay}</p>

      <br />
      <br />
      <button type="button" onClick={handleClickButton}>
        navigate to sub
      </button>
      <br />
    </>
  );
}
