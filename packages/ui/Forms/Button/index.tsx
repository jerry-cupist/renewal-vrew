'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained'
  color?: 'primary' | 'secondary'
  full?: boolean
}

const VARIANT_CLASS = {
  contained:
    'relative px-[16px] rounded select-none gap-[4px] h-[28px] flex items-center justify-center',
}

const COLOR_CLASS = {
  primary: 'text-white bg-purple disabled:bg-gray-200 shadow-none',
  secondary: 'text-white disabled:bg-gray-200',
}

export function Button({
  children,
  className,
  variant = 'contained',
  color = 'primary',
  full = false,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={clsx(
        VARIANT_CLASS[variant],
        COLOR_CLASS[color],
        full && 'w-full',
        className,
      )}
    >
      {children}
    </button>
  )
}
