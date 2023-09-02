"use client";

import { Screens } from "@vrew/modules/web-bridge/constants/screen-enfpy";
import { useNavigation } from "@hooks/navigation/useNavigation";

export default function Page(): JSX.Element {
  const navigation = useNavigation();

  const handlePressFavorSetting = () => {
    navigation.navigate(Screens.FAVOR_SETTING);
  };
  return (
    <>
      <div>
        <p>ENFPY</p>
        <button onClick={handlePressFavorSetting}>선호설정</button>
      </div>
    </>
  );
}
