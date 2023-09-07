'use client'

import { HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLDivElement> {
  fullScreen?: boolean
  padding?: boolean

  backgroundColor?: string
}

/**
 * 색상을 동적으로 할당하는 방식이 테일윈드에서 동작하는지?
 */
export function Container({
  children,
  padding = true,
  fullScreen,
  backgroundColor,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      {...props}
      className={clsx(
        'container overflow-y-auto',
        fullScreen && 'h-screen w-screen',
        padding && 'p-6',
        backgroundColor && backgroundColor,
      )}
    >
      {children}
    </div>
  )
}
