'use client'

import { MouseEventHandler, PropsWithChildren } from 'react'
import CONFIG from '../constant/config'
import { useNavigation } from '../hooks/navigation/useNavigation'
import { Link, LinkProps } from '@vrew/ui'

interface AnchorProps extends LinkProps {
  enableLink?: boolean
}

/**
 * TODO: 권한처리가 필요하다.
 */
const Anchor = ({
  children,
  onClick,
  /** WEBVIEW에서는 클릭을 동작하지 않는다. */
  enableLink = CONFIG.IS_WEB,
  ...props
}: PropsWithChildren<AnchorProps>) => {
  const navigation = useNavigation()

  const handleClick: MouseEventHandler<HTMLAnchorElement> = event => {
    if (!enableLink && CONFIG.IS_WEBVIEW) {
      event.preventDefault()

      const pathname =
        typeof props.href === 'string' ? props.href : props.href.pathname || '/'

      navigation.navigate(pathname)
    }
    onClick?.(event)
  }

  return (
    <Link {...props} onClick={enableLink ? undefined : handleClick}>
      {children}
    </Link>
  )
}

export default Anchor
