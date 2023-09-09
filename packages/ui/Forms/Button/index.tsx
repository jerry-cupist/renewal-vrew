'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained'
  color?: 'primary'
}

export function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={clsx(
        'relative px-2 text-white rounded bg-purple disabled:bg-gray-200',
        className,
      )}
    >
      {children}
    </button>
  )
}
