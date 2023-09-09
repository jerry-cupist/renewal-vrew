import BottomTabBarItem from './BottomTabBarItem'
import HomeIcon from '../../assets/home_outlined.svg'
import HomeActiveIcon from '../../assets/home_filled.svg'
import ConnectionIcon from '../../assets/connection_outlined.svg'
import ConnectionActiveIcon from '../../assets/connection_filled.svg'
import StationIcon from '../../assets/station_outlined.svg'
import StationActiveIcon from '../../assets/station_filled.svg'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'
import CONFIG from '../../constant/config'

const BOTTOM_TAB_LIST = [
  {
    to: ENFPY_WEB_URL.ROOT,
    activeIcon: <HomeActiveIcon />,
    inActiveICon: <HomeIcon />,
  },
  {
    to: ENFPY_WEB_URL.CHAT_LIST,
    activeIcon: <ConnectionActiveIcon />,
    inActiveICon: <ConnectionIcon />,
  },
  {
    to: ENFPY_WEB_URL.STATION,
    activeIcon: <StationActiveIcon />,
    inActiveICon: <StationIcon />,
  },
  {
    to: ENFPY_WEB_URL.PROFILE,
    activeIcon: <StationActiveIcon />,
    inActiveICon: <StationIcon />,
  },
]

export default function BottomTabBar() {
  if (CONFIG.IS_WEBVIEW) {
    return null
  }

  return (
    <nav className="bg-[#FAFAFA] border-t-[rgba(0, 0, 0, 0.12)] w-full ">
      <ul className="flex justify-between w-full">
        {BOTTOM_TAB_LIST.map(tabItem => (
          <li key={tabItem.to} className="w-full">
            <BottomTabBarItem
              to={tabItem.to}
              activeIcon={tabItem.activeIcon}
              InActiveIcon={tabItem.inActiveICon}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
