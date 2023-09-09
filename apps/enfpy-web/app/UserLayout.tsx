'use client'

import { PropsWithChildren } from 'react'
import BottomTabBar from '../components/BottomTabBar'
import useAuth from '../hooks/useAuth'
import clsx from 'clsx'

interface Props {
  className?: string
}

export default function UserLayout({
  children,
  className,
}: PropsWithChildren<Props>) {
  const auth = useAuth()

  return (
    <>
      <main className={clsx('h-[calc(100%-48px)]', className)}>{children}</main>
      {auth.isSignIn && <BottomTabBar />}
    </>
  )
}
