'use client'

import { HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLDivElement> {
  fullScreen?: boolean
  padding?: boolean
}

/**
 * 색상을 동적으로 할당하는 방식이 테일윈드에서 동작하는지?
 */
export function Container({
  children,
  padding = false,
  fullScreen,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      {...props}
      className={clsx(
        'container overflow-y-auto',
        fullScreen && 'h-full w-full',
        padding && 'p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
