'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained'
  color?: 'primary' | 'secondary'
}

const VARIANT_CLASS = {
  contained: 'relative px-2 rounded ',
}

const COLOR_CLASS = {
  primary: 'text-white bg-purple disabled:bg-gray-200',
  secondary: 'text-white disabled:bg-gray-200',
}

export function Button({
  children,
  className,
  variant = 'contained',
  color = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={clsx(VARIANT_CLASS[variant], COLOR_CLASS[color], className)}
    >
      {children}
    </button>
  )
}
