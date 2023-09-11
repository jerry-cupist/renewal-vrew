import LoginForm from '../../../features/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage(): JSX.Element {
  return (
    <>
      <Link href="/" />
      <LoginForm />
    </>
  )
}
