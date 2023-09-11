'use client'

import { PostPhoneVerificationResponse } from '@vrew/apis/enfpy/auth'
import { getPhoneNumber } from '@vrew/utils'
import { FormEventHandler, useState } from 'react'
import enfpyApiUtil from '../../apis'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '../../hooks/navigation/useNavigation'
import { Button, Input, Text } from '@vrew/ui'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'

const isValidPhoneNumber = (value: string) =>
  /^\(?([0-9]{3})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/.test(value)

const isValidPhoneVerificationCode = (value: string) => {
  return value.length === 4
}

export default function LoginForm(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('')
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

    await auth.signIn({
      phoneVerificationCode,
      phoneVerificationId: phoneVerification.data.phoneVerificationId,
      loginAccountIdentification: phoneVerification.data.phoneNumber,
    })

    navigation.navigate(ENFPY_WEB_URL.ROOT)
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

  const isValidForm =
    isValidPhoneVerificationCode(phoneVerificationCode) &&
    isValidPhoneNumber(phoneNumber)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Text variant="title2"> 전화 번호를 입력해주세요</Text>
        <Input
          type="number"
          id="phoneNumber"
          value={phoneNumber}
          placeholder="010-0000-0000"
          onChange={event => setPhoneNumber(event.currentTarget.value)}
        />
        <Button
          full
          variant="contained"
          type="button"
          className="mt-[8px]"
          disabled={!isValidPhoneNumber(phoneNumber)}
          onClick={handleClickPhoneVerificationButton}
        >
          인증번호 받기
        </Button>
      </div>

      <hr className="my-[16px] border-none" />
      <div>
        <Text variant="title2"> 인증번호를 입력해주세요</Text>
        <Input
          type="number"
          id="phoneVerificationCode"
          inputMode="numeric"
          placeholder="인증번호를 입력하세요"
          onChange={event =>
            setPhoneVerificationCode(event.currentTarget.value)
          }
        />
      </div>

      <Button
        variant="contained"
        type="submit"
        full
        className="mt-[8px]"
        disabled={!isValidForm}
      >
        로그인
      </Button>
    </form>
  )
}
