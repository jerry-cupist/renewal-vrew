'use client'

import { PostPhoneVerificationResponse } from '@vrew/apis/enfpy/auth'
import { getPhoneNumber } from '@vrew/utils'
import { FormEventHandler, useState } from 'react'
import enfpyApiUtil from '../../apis'
import useAuth from '../../hooks/useAuth'
import ENPFY_URL from '../../constant/url'
import { useNavigation } from '../../hooks/navigation/useNavigation'

export default function LoginForm(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('01089265827')

  const [phoneVerification, setPhoneVerification] =
    useState<PostPhoneVerificationResponse>()

  const auth = useAuth()
  const navigation = useNavigation()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    if (!phoneVerification) {
      console.log('인증 번호를 요청하세요')
      return
    }

    const formElement: HTMLFormElement = event.currentTarget
    const phoneVerificationCode: string = (
      formElement['phoneVerificationCode'] as HTMLInputElement
    ).value

    await auth.signIn({
      phoneVerificationCode,
      phoneVerificationId: phoneVerification.data.phoneVerificationId,
      loginAccountIdentification: phoneVerification.data.phoneNumber,
    })

    navigation.navigate(ENPFY_URL.ROOT)
  }

  /**
   * 인증번호 요청
   */
  const handleClickPhoneVerificationButton = async () => {
    const phoneNumberInfo = getPhoneNumber(phoneNumber)

    const { data: phoneVerification } =
      await enfpyApiUtil.auth.postPhoneVerification(phoneNumberInfo)

    setPhoneVerification(phoneVerification)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="phoneNumber"> 핸드폰번호</label>
        <input
          type="number"
          id="phoneNumber"
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.currentTarget.value)}
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
  )
}
