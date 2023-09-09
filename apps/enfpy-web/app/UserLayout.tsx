'use client'

import { PropsWithChildren } from 'react'
import BottomTabBar from '../components/BottomTabBar'
import useAuth from '../hooks/useAuth'

export default function UserLayout({ children }: PropsWithChildren) {
  const auth = useAuth()

  return (
    <>
      <main className="h-[calc(100%-48px)]">{children}</main>
      {auth.isSignIn && <BottomTabBar />}
    </>
  )
}
