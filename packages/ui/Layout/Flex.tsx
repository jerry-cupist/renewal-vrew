import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface Props {
  column?: boolean
  itemsStart?: boolean
  className?: string
}

export default function Flex({
  children,
  column,
  itemsStart,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        'flex',
        'flex-grow-1',
        column && 'flex-col',
        itemsStart && 'items-start',
        className,
      )}
    >
      {children}
    </div>
  )
}
