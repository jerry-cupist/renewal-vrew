import { Container } from '@vrew/ui'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <Container fullScreen>{children}</Container>
}
