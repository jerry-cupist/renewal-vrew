"use client";

import { Header } from "@vrew/ui";
import { useNavigation } from "../../hooks/navigation/useNavigation";
import Anchor from "../../components/Anchor";
import { Screens } from "@vrew/modules/web-bridge/constants/screen-enfpy";

export default function Page(): JSX.Element {
  const navigation = useNavigation();

  const onPressFavorSetting = () => {};
  return (
    <>
      <Header text="HOME" />
      <h2>home</h2>
      <Anchor screen={Screens.FAVOR_SETTING}>선호설정</Anchor>
    </>
  );
}
