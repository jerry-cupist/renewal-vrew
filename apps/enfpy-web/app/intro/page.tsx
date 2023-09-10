'use client'

import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'
import { Button, Container } from '@vrew/ui'
import { useNavigation } from 'hooks/navigation/useNavigation'
export default function IntroPage(): JSX.Element {
  const navigation = useNavigation()

  const handleClick = () => {
    navigation.navigate(ENFPY_WEB_URL.LOGIN)
  }

  return (
    <Container className="relative bg-[#9200fb]" fullScreen>
      <div className="absolute bottom-0 flex justify-center w-full">
        <Button
          color="secondary"
          className="w-full  py-[16px]"
          onClick={handleClick}
        >
          이미 계정이 있어요
        </Button>
      </div>
    </Container>
  )
}
