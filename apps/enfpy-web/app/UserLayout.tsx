'use client'

import { PropsWithChildren } from 'react'
import BottomTabBar from '../components/BottomTabBar'
import useAuth from '../hooks/useAuth'
import clsx from 'clsx'
import CONFIG from '../constant/config'

interface Props {
  className?: string
}

const defaultClass = [
  [CONFIG.IS_WEBVIEW, 'h-full'],
  [CONFIG.IS_WEB, 'h-[calc(100%-48px)]'],
]
  .map(([condition, className]) => (condition ? className : ''))
  .join(' ')

export default function UserLayout({
  children,
  className,
}: PropsWithChildren<Props>) {
  const auth = useAuth()

  return (
    <>
      <main className={clsx(defaultClass, className)}>{children}</main>
      {auth.isSignIn && <BottomTabBar />}
    </>
  )
}
