import { Container } from '@vrew/ui'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <Container padding={false} fullScreen>
      {children}
    </Container>
  )
}
