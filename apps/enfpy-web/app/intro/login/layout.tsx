import { Container } from '@vrew/ui'
import { PropsWithChildren } from 'react'

export default function LoginLayout({ children }: PropsWithChildren) {
  return <Container padding>{children}</Container>
}
