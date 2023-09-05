import { Header } from '@vrew/ui'
import LoginForm from '../../features/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage(): JSX.Element {
  return (
    <>
      <Header text="Login" />
      <Link href="/" />
      <LoginForm />
    </>
  )
}
