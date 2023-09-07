'use client'

import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

const TEXT_VARIANT = {
  title2: 'text-title2',
  subtitle2: 'text-subtitle2',
  body3: 'text-body3',
} as const

type TextVariant = keyof typeof TEXT_VARIANT

const TEXT_COLOR = {
  white: 'text-[#fff]',
  black: 'text-[#1A1A1A]',
} as const
type TextColor = keyof typeof TEXT_COLOR

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  variant: TextVariant
  color?: TextColor
}

export function Text({
  variant,
  color = 'black',
  ...props
}: PropsWithChildren<Props>) {
  const textVariant = TEXT_VARIANT[variant]
  const textColor = TEXT_COLOR[color]

  return (
    <p
      {...props}
      className={clsx(textVariant && textVariant, textColor && textColor)}
    />
  )
}
