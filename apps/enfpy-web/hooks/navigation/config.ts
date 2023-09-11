import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'

/**
 * 스크린 이동이 필요한 페이지를 지정한다.
 * 스크린의 뎁스를 표현할 떄
 */
const NEED_SCREEN: string[] = [ENFPY_WEB_URL.LOGIN, ENFPY_WEB_URL.INTRO]

/**
 * 스크린으로 지정된 URL인지 구분한다.
 */
export const isScreen = (pathname: string) => NEED_SCREEN.includes(pathname)
