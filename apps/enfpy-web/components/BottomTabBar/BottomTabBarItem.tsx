import Flex from '@vrew/ui/Layout/Flex'
import { ReactNode } from 'react'
import Anchor from '../Anchor'
import { usePathname } from 'next/navigation'

interface Props {
  activeIcon?: ReactNode
  InActiveIcon?: ReactNode
  to: string
}

export default function BottomTabBarItem({
  InActiveIcon,
  activeIcon,
  to,
}: Props) {
  const pathname = usePathname()
  const isActive = to === pathname
  const icon = isActive ? activeIcon : InActiveIcon

  return (
    <Flex justify="justify-center" align="items-center" className="h-[48px]">
      <Anchor
        href={to}
        className="flex items-center justify-center w-full h-full"
      >
        {icon}
      </Anchor>
    </Flex>
  )
}
