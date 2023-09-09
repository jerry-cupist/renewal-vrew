import { Text } from '@vrew/ui'
import Chip from './Chip'
import { usePersonalityTest } from '../../hooks/queries/profile'

/**
 * 라벨 버튼 스타일 공통화
 */
export default function PersonalityTestChip() {
  const personalityTest = usePersonalityTest()
  const firstPersonalityTest = personalityTest.data?.[0]
  const backgroundColor = firstPersonalityTest?.backgroundColorCode
  const color = firstPersonalityTest?.fontColorCode

  return (
    <Chip
      style={{
        backgroundColor,
      }}
    >
      <Text
        variant="button2"
        style={{
          color,
        }}
      >
        {firstPersonalityTest?.title}
      </Text>
    </Chip>
  )
}
