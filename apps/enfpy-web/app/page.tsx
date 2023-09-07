'use client'

import { Container, Header, Text } from '@vrew/ui'
import useAuth from '../hooks/useAuth'
import Anchor from '../components/Anchor'
import { useSession } from '../hooks/server/auth'

export default function Page(): JSX.Element {
  const auth = useAuth()
  const session = useSession()

  return (
    <Container padding={false}>
      <Header text="ENFPY_2" />

      {auth.isLoading ? (
        '로딩중'
      ) : (
        <>
          <Text variant="title2">
            {auth.isSignIn ? `Hi ${session.data?.user.id}!` : '로그인 하세요'}
          </Text>

          <div>
            {auth.isSignIn && (
              <button onClick={() => auth.signOut({})}>로그아웃</button>
            )}
          </div>

          <div>
            <Text variant="title2">withAuth</Text>
            <ul>
              <li>
                <Anchor href="/profile">프로필 페이지</Anchor>
              </li>
            </ul>
          </div>
          <div>
            <Text variant="title2">withOutAuth</Text>
            <ul>
              <li>
                <Anchor href="/login">로그인 페이지</Anchor>
              </li>
            </ul>
          </div>
        </>
      )}
    </Container>
  )
}
