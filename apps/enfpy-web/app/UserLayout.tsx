'use client'

import { PropsWithChildren } from 'react'
import BottomTabBar from '../components/BottomTabBar'
import useAuth from '../hooks/useAuth'
import Flex from '@vrew/ui/Layout/Flex'

export default function UserLayout({ children }: PropsWithChildren) {
  const auth = useAuth()

  return (
    <Flex direction="column" className=" h-[100%]">
      {children}
      {auth.isSignIn && <BottomTabBar />}
    </Flex>
  )
}
