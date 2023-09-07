'use client'

import { HTMLAttributes, PropsWithChildren } from 'react'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  variant: 'title2' | 'subtitle2'
}

const TEXT_VARIANT = {
  title2: 'text-title2',
  subtitle2: 'text-subtitle2',
} as const

export function Text({ variant, ...props }: PropsWithChildren<Props>) {
  const textClass = TEXT_VARIANT[variant]

  return <p {...props} className={`text-purple ${textClass}`} />
}
