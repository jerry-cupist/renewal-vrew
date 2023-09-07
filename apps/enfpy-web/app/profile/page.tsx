'use client'

import { Container, Text } from '@vrew/ui'
import ProfileHeader from '../../features/profile/profileHeader'
import { useProfileDetail, useProfileImage } from '../../hooks/server/profile'
import ProfileImage from '../../features/profile/profileImage'
import MbtiChip from './MbtiChip'

export default function ProfilePage(): JSX.Element {
  const profile = useProfileDetail()
  const profileImage = useProfileImage()

  return (
    <Container padding={false}>
      <ProfileHeader mbti="ISTJ" />

      <div className="p-3">
        <div className="flex">
          {profileImage.data && (
            <ProfileImage
              className="shrink-0 rounded-[50%] bg-gray-100  object-cover overflow-hidden w-[96px] h-[96px] box-border"
              src={profileImage.data}
              width={96}
              height={96}
              alt="프로필"
              loading="eager"
            />
          )}

          <div className="flex flex-col flex-grow-1 pl-[16px] overflow-hidden w-full gap-[8px]">
            <Text variant="subtitle2">{profile.data?.nickname}</Text>
            <MbtiChip mbti="istj" />
          </div>
        </div>
      </div>
    </Container>
  )
}
