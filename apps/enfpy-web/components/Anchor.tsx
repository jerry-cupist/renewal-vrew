"use client";

import { MouseEventHandler, PropsWithChildren } from "react";
import CONFIG from "../constant/config";
import { useNavigation } from "../hooks/navigation/useNavigation";
import { Screens } from "@vrew/modules/web-bridge/constants/screen-enfpy";

interface AnchorProps {
  enableLink?: boolean;
  screen: Screens;
}

/**
 *
 * TODO: 권한처리가 필요하다.
 */
const Anchor = ({
  children,
  enableLink = CONFIG.IS_WEB,
  ...props
}: PropsWithChildren<AnchorProps>) => {
  const navigation = useNavigation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log({ enableLink }, CONFIG.IS_WEBVIEW);
    navigation.navigate(props.screen);
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Anchor;
