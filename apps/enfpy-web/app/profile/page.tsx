'use client'

import { Container, Text } from '@vrew/ui'
import ProfileHeader from '../../features/profile/profileHeader'
import { useProfileDetail, useProfileImage } from '../../hooks/server/profile'
import ProfileImage from '../../features/profile/profileImage'
import MbtiChip from '../../features/profile/MbtiChip'
import Flex from '@vrew/ui/Layout/Flex'
import PersonalityTestChip from '../../features/profile/PersonalityTextChip'

export default function ProfilePage(): JSX.Element {
  const profile = useProfileDetail()
  const profileImage = useProfileImage()

  return (
    <Container padding={false}>
      <ProfileHeader mbti="ISTJ" />

      <div className="p-3">
        <Flex>
          <ProfileImage
            src={profileImage.data}
            size={96}
            alt="프로필"
            loading="eager"
          />

          <Flex
            column
            itemsStart
            className="ml-[16px] overflow-hidden w-full gap-[8px]"
          >
            <Text variant="subtitle2">{profile.data?.nickname}</Text>
            <MbtiChip mbti="istj" />
            <PersonalityTestChip />
          </Flex>
        </Flex>
      </div>
    </Container>
  )
}
