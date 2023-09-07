'use client'

import { PostPhoneVerificationResponse } from '@vrew/apis/enfpy/auth'
import { getPhoneNumber } from '@vrew/utils'
import { FormEventHandler, useState } from 'react'
import enfpyApiUtil from '../../apis'
import useAuth from '../../hooks/useAuth'
import ENPFY_URL from '../../constant/url'
import { useNavigation } from '../../hooks/navigation/useNavigation'
import { Button, Input, Text } from '@vrew/ui'

export default function LoginForm(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('')

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
        <Text variant="title2"> 핸드폰번호</Text>
        <Input
          type="number"
          id="phoneNumber"
          value={phoneNumber}
          placeholder="핸드폰 번호를 입력하세요"
          onChange={event => setPhoneNumber(event.currentTarget.value)}
        />
        <Button
          variant="contained"
          type="button"
          onClick={handleClickPhoneVerificationButton}
        >
          인증번호 받기
        </Button>
      </div>
      <div>
        <Text variant="title2"> 인증번호</Text>
        <Input
          type="number"
          id="phoneVerificationCode"
          placeholder="인증번호를 입력하세요"
        />
      </div>

      <Button variant="contained" type="submit">
        로그인
      </Button>
    </form>
  )
}
