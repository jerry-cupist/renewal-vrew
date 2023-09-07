'use client'

import _Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

interface Props extends LinkProps {
  enableLink?: boolean
}

export function Link({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <_Link
      {...props}
      className="px-2 underline relative rounded bg-transparent disabled:bg-gray-200 text-cyan-400"
    >
      {children}
    </_Link>
  )
}
