"use client";

import { enfpyApis } from "@vrew/apis";
import { useEffect } from "react";

export default function MainButton(): JSX.Element {
  enfpyApis.apiClient.defaults.baseURL = "https://enfpy.cupist.dev/api/enfpy";
  useEffect(() => {
    enfpyApis.authAPis
      .postPhoneVerification({
        countryCode: "+82",
        nationalNumber: "1022224444",
        phoneNumber: "+821022224444",
      })
      .then(({ data }) => {
        console.log({ phoneNumber: data.data.phoneNumber });
      });
  }, []);
  return (
    <button onClick={(): void => alert("booped")} type="button">
      메인 버튼
    </button>
  );
}
