import SvgMypageIstj from '../../../components/icon/IconIstj'
import { Container } from '@vrew/ui'

type MbtiType = keyof typeof MBTI_COLOR
interface Props {
  mbti: MbtiType
}

const MBTI_COLOR = {
  ISTJ: 'bg-[#5F6BF2]',
} as const

export default function ProfileHeader({ mbti }: Props) {
  const backgroundColor = MBTI_COLOR[mbti]

  return (
    <Container backgroundColor={backgroundColor} padding={false}>
      <div className="h-[254px] flex items-end">
        <SvgMypageIstj width="100%" height={194} />
      </div>
    </Container>
  )
}
