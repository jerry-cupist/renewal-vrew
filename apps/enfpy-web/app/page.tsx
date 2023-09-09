'use client'

import { Button, Container, Text } from '@vrew/ui'
import useAuth from '../hooks/useAuth'
import EnfpyLogo from '../assets/enfpy_logo.svg'
import Flex from '@vrew/ui/Layout/Flex'
import { useProfileDetail } from '../hooks/server/profile'

export default function Page(): JSX.Element {
  const auth = useAuth()
  const profile = useProfileDetail()

  return (
    <Container padding={false} className="bg-slate-400" fullScreen>
      <EnfpyLogo />

      {auth.isLoading ? (
        '로딩중'
      ) : (
        <Flex className="p-[16px]">
          <Text variant="subtitle2">
            {auth.isSignIn ? `Hi ${profile.data?.nickname}!` : '로그인 하세요'}
          </Text>

          {auth.isSignIn && (
            <Button className="ml-[16px]" onClick={() => auth.signOut({})}>
              로그아웃
            </Button>
          )}
        </Flex>
      )}
    </Container>
  )
}
