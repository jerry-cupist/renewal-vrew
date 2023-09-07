'use client'

import { Container, Text } from '@vrew/ui'
import ProfileHeader from '../../features/profile/profileHeader'
import { useProfileDetail, useProfileImage } from '../../hooks/server/profile'
import ProfileImage from '../../features/profile/profileImage'

export default function ProfilePage(): JSX.Element {
  const profile = useProfileDetail()
  const profileImage = useProfileImage()

  return (
    <Container
      padding={false}
      className="container overflow-y-auto h-screen w-screen"
    >
      <ProfileHeader mbti="ISTJ" />

      <div className="p-3">
        <div className="flex">
          {profileImage.data && (
            <ProfileImage
              className="bg-gray-100 rounded object-contain overflow-hidden w-[96px] h-[96px]"
              src={profileImage.data}
              width={96}
              height={96}
              alt="프로필"
              loading="eager"
            />
          )}
          <Text variant="subtitle2" className="text-subtitle2">
            {profile.data?.nickname}
          </Text>
        </div>
      </div>
    </Container>
  )
}
