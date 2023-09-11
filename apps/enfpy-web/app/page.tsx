'use client'

import { Button, Text } from '@vrew/ui'
import useAuth from '../hooks/useAuth'
import EnfpyLogo from '../assets/enfpy_logo.svg'
import Flex from '@vrew/ui/Layout/Flex'
import { useProfileDetail } from '../hooks/queries/profile'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'
import UserLayout from './UserLayout'

export default function Page(): JSX.Element {
  const auth = useAuth()
  const profile = useProfileDetail()
  const isLoading = auth.isLoading || profile.isLoading

  return (
    <UserLayout className="bg-slate-400 h-[100%]" header={<EnfpyLogo />}>
      {isLoading ? (
        '로딩중'
      ) : (
        <Flex className="p-[16px]">
          <Text variant="subtitle2">
            {auth.isSignIn ? `Hi ${profile.data?.nickname}!` : '로그인 하세요'}
          </Text>

          {auth.isSignIn && (
            <Button
              className="ml-[16px]"
              onClick={() => auth.signOut({ callbackUrl: ENFPY_WEB_URL.INTRO })}
            >
              로그아웃
            </Button>
          )}
        </Flex>
      )}
    </UserLayout>
  )
}
