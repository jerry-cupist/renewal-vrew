'use client'

import clsx from 'clsx'
import _Link, { LinkProps as _LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export interface LinkProps extends _LinkProps {
  enableLink?: boolean
  className?: string
}

export function Link({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <_Link
      {...props}
      className={clsx(
        'px-2 underline relative rounded bg-transparent disabled:bg-gray-200 text-cyan-400',
        className,
      )}
    >
      {children}
    </_Link>
  )
}
