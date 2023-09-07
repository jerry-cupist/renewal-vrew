import { Text } from '@vrew/ui'
import IconIstj from '../../components/icon/IconIstj'

interface Props {
  mbti: MbtiTypes
}

const MbtiTagInfo = {
  enfp: { Icon: IconIstj, text: '인간 스파클링 허스키' },
  intp: { Icon: IconIstj, text: '상상력 부자 레서 판다' },
  entj: { Icon: IconIstj, text: '황제가 될 상 도베르만' },
  isfj: { Icon: IconIstj, text: '인간 솜사탕 롭이어' },

  entp: { Icon: IconIstj, text: '본투비 딜러 비글' },
  isfp: { Icon: IconIstj, text: '프로 집콕러 페르시안' },
  esfj: { Icon: IconIstj, text: '친화력 만렙 푸들' },
  istj: { Icon: IconIstj, text: '모범생 치와와' },

  esfp: { Icon: IconIstj, text: '파티 풀 부킹 웰시코기' },
  istp: { Icon: IconIstj, text: '반전 매력 햄스터' },
  estj: { Icon: IconIstj, text: '계획력 만렙 보더콜리' },
  enfj: { Icon: IconIstj, text: '의리 보스 골든 리트리버' },

  intj: { Icon: IconIstj, text: '심장은 따듯한 AI 페럿' },
  infp: { Icon: IconIstj, text: '감성충만 아메리칸 숏헤어' },
  infj: { Icon: IconIstj, text: '조용한 팩폭러 포메라니안' },
  estp: { Icon: IconIstj, text: '직진 본능 뱅갈' },
} as const

type MbtiTypes = keyof typeof MbtiTagInfo

export default function MbtiChip(props: Props) {
  const mbti = props.mbti.toLocaleLowerCase() as MbtiTypes
  const tagInfo = MbtiTagInfo[mbti]
  const Icon = tagInfo?.Icon
  return (
    <div className="bg-[#5F6BF2] flex flex-row px-[10px] py-[6px] rounded-[8px]">
      {Icon && <Icon className="w-[16px] h-[16px] mr-[4px]" />}
      <Text variant="body3" color="white">
        {[mbti.toUpperCase(), tagInfo.text].join(' · ')}
      </Text>
    </div>
  )
}
