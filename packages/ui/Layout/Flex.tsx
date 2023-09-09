import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type WrapType = 'flex-wrap' | 'flex-wrap-reverse' | 'flex-nowrap'
type ShrinkType = 'shrink' | 'shrink-0'
type GrowType = 'grow' | 'grow-0'
type DirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type AlignType =
  | 'items-start'
  | 'items-end'
  | 'items-center'
  | 'items-baseline'
  | 'items-stretch'
type JustifyType =
  | 'justify-normal'
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly'
  | 'justify-stretch'

interface Props {
  direction?: DirectionType
  justify?: JustifyType
  align?: AlignType
  wrap?: WrapType
  shrink?: ShrinkType
  className?: string
  grow?: GrowType
}

const growClass: Record<GrowType, string> = {
  'grow-0': 'grow-0',
  grow: 'grow',
}

const shrinkClass: Record<ShrinkType, string> = {
  shrink: 'shrink',
  'shrink-0': 'shrink-0',
}

const wrapClass: Record<WrapType, string> = {
  'flex-nowrap': 'flex-nowrap',
  'flex-wrap': 'flex-wrap',
  'flex-wrap-reverse': 'flex-wrap-reverse',
}

const justifyClass: Record<JustifyType, string> = {
  'justify-around': 'justify-around',
  'justify-between': 'justify-between',
  'justify-center': 'justify-center',
  'justify-end': 'justify-end',
  'justify-evenly': 'justify-evenly',
  'justify-normal': 'justify-normal',
  'justify-start': 'justify-start',
  'justify-stretch': 'justify-stretch',
}

const directionClass: Record<DirectionType, string> = {
  column: 'flex-col',
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
}
const alignClass: Record<AlignType, string> = {
  'items-baseline': 'items-baseline',
  'items-start': 'items-start',
  'items-end': 'items-end',
  'items-stretch': 'items-stretch',
  'items-center': 'items-center',
}

export default function Flex({
  children,
  className,
  align = 'items-start',
  direction = 'row',
  justify = 'justify-start',
  wrap = 'flex-wrap',
  shrink = 'shrink',
  grow = 'grow',
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        'flex',
        directionClass[direction],
        alignClass[align],
        justifyClass[justify],
        wrapClass[wrap],
        shrinkClass[shrink],
        growClass[grow],
        className,
      )}
    >
      {children}
    </div>
  )
}
