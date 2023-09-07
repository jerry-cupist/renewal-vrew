'use client'

import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'contained'
  color?: 'primary'
}

export function Button({ children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className="px-2 relative rounded bg-purple disabled:bg-gray-200 text-white"
    >
      {children}
    </button>
  )
}
