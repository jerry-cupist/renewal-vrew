"use client";

import { PostPhoneVerificationResponse } from "@vrew/apis/enfpy/auth";
import { getPhoneNumber } from "@vrew/utils";
import { FormEventHandler, useState } from "react";
import enfpyApiUtil from "../../apis";

export default function LoginForm(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneVerification, setPhoneVerification] =
    useState<PostPhoneVerificationResponse>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!phoneVerification) {
      console.log("인증 번호를 요청하세요");
      return;
    }

    const formElement: HTMLFormElement = event.currentTarget;
    const phoneVerificationCode: string = (
      formElement["phoneVerificationCode"] as HTMLInputElement
    ).value;

    const response = await enfpyApiUtil.auth.postSignIn({
      phoneVerificationCode,
      phoneVerificationId: phoneVerification.data.phoneVerificationId,
      loginAccountIdentification: phoneVerification.data.phoneNumber,
    });

    // 1. storage 저장
    localStorage.setItem(
      "token",
      JSON.stringify({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      })
    );

    // TODO 2. RN에 토큰 정보 갱신 요청
  };

  /**
   * 인증번호 요청
   */
  const handleClickPhoneVerificationButton = async () => {
    const phoneNumberInfo = getPhoneNumber(phoneNumber);

    console.log({ phoneNumberInfo });
    const { data: phoneVerification } =
      await enfpyApiUtil.auth.postPhoneVerification(phoneNumberInfo);

    setPhoneVerification(phoneVerification);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="phoneNumber"> 핸드폰번호</label>
        <input
          type="number"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        />
        <button type="button" onClick={handleClickPhoneVerificationButton}>
          인증번호 받기
        </button>
      </div>
      <div>
        <label htmlFor="phoneVerificationCode">인증번호</label>
        <input type="number" id="phoneVerificationCode" />
      </div>

      <button type="submit">로그인</button>
    </form>
  );
}
