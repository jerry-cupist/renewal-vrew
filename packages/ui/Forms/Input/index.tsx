'use client'

import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: Props) {
  return (
    <input
      {...props}
      className="p-0 text-purple text-xl focus:outline-none placeholder:text-gray-200"
    />
  )
}
