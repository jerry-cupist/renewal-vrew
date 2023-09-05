'use client'

import { Header } from '@vrew/ui'
import { calculateDDay } from '../../utils/dayUtil'
import { useNavigation } from '../../hooks/navigation/useNavigation'
import { ENFPY_WEB_URL } from '@vrew/modules/enfpyBridge/shared/constants/page-enpfy'
export default function Page(): JSX.Element {
  const navigation = useNavigation()
  const dDay = calculateDDay('2023-09-01T00:00:00', '2023-09-15T00:00:00')

  const handleClickButton: () => void = () => {
    navigation.navigate(ENFPY_WEB_URL.SUB)
  }

  return (
    <>
      <Header text="MAIN" />
      <h2>main</h2>
      <p>{dDay}</p>

      <br />
      <br />
      <button type="button" onClick={handleClickButton}>
        navigate to sub
      </button>
      <br />
    </>
  )
}
