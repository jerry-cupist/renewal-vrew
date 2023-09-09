'use client'

import { Text } from '@vrew/ui'
import { useProfileDetail, useProfileImage } from '../../hooks/queries/profile'
import ProfileImage from '../../features/profile/profileImage'
import MbtiChip from '../../features/profile/MbtiChip'
import Flex from '@vrew/ui/Layout/Flex'
import PersonalityTestChip from '../../features/profile/PersonalityTextChip'

export default function ProfileInfo() {
  const profile = useProfileDetail()
  const profileImage = useProfileImage()

  return (
    <Flex className="p-3">
      <ProfileImage
        src={profileImage.data}
        size={96}
        alt="프로필"
        loading="eager"
      />

      <Flex
        direction="column"
        align="items-start"
        className="ml-[16px] overflow-hidden w-full gap-[8px]"
      >
        <Text variant="subtitle2">{profile.data?.nickname}</Text>
        <MbtiChip mbti="istj" />
        <PersonalityTestChip />
      </Flex>
    </Flex>
  )
}
