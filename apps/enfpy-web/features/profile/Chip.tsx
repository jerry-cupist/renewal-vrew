import clsx from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  backgroundColor?: string
  leftIcon?: ReactNode
  fullWidth?: boolean
}

/**
 * 16진수 컬러 코드
 */
const isColorCode = (colorCode: string) =>
  /^#(?:[0-9a-f]{3}){1,2}$/i.test(colorCode)

export default function Chip({
  leftIcon,
  children,
  backgroundColor,
  color,
  fullWidth,
  ...props
}: PropsWithChildren<Props>) {
  const validColorClass = backgroundColor && !isColorCode(backgroundColor)
  const backgroundColorClass = validColorClass ? backgroundColor : ''
  const colorClass = color || 'text-black'

  return (
    <button
      className={clsx(
        'flex items-center h-[28px] p-[8px] rounded-[6px] gap-[4px]',
        fullWidth && 'w-full',
        backgroundColorClass,
        colorClass,
      )}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
    </button>
  )
}
