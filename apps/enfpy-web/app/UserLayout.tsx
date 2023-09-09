'use client'

import { PropsWithChildren, ReactNode } from 'react'
import BottomTabBar from '../components/BottomTabBar'
import Flex from '@vrew/ui/Layout/Flex'
import clsx from 'clsx'

interface Props {
  className?: string
  header?: ReactNode
}

export default function UserLayout({
  children,
  className,
  header,
}: PropsWithChildren<Props>) {
  return (
    <Flex direction="column" className={clsx('h-full', className)}>
      <main className="flex-grow w-full">
        {header}
        {children}
      </main>
      <BottomTabBar />
    </Flex>
  )
}
