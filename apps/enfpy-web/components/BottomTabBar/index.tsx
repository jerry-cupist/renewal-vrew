import Flex from '@vrew/ui/Layout/Flex'
import BottomTabBarItem from './BottomTabBarItem'
import HomeIcon from '../../assets/home_outlined.svg'
import HomeActiveIcon from '../../assets/home_filled.svg'
import ConnectionIcon from '../../assets/connection_outlined.svg'
import ConnectionActiveIcon from '../../assets/connection_filled.svg'
import StationIcon from '../../assets/station_outlined.svg'
import StationActiveIcon from '../../assets/station_filled.svg'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'

export default function BottomTabBar() {
  return (
    <Flex
      justify="justify-between"
      className="bg-[#FAFAFA] border-t-[rgba(0, 0, 0, 0.12)] w-full"
    >
      <BottomTabBarItem
        to={ENFPY_WEB_URL.ROOT}
        activeIcon={<HomeActiveIcon />}
        InActiveIcon={<HomeIcon />}
      />
      <BottomTabBarItem
        to={ENFPY_WEB_URL.CHAT_LIST}
        activeIcon={<ConnectionActiveIcon />}
        InActiveIcon={<ConnectionIcon />}
      />
      <BottomTabBarItem
        to={ENFPY_WEB_URL.STATION}
        activeIcon={<StationActiveIcon />}
        InActiveIcon={<StationIcon />}
      />

      <BottomTabBarItem
        to={ENFPY_WEB_URL.PROFILE}
        activeIcon={<StationActiveIcon />}
        InActiveIcon={<StationIcon />}
      />
    </Flex>
  )
}
