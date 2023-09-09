'use client'

import { Container } from '@vrew/ui'
import ProfileHeader from '../../features/profile/profileHeader'
import ProfileInfo from '../../features/profile/ProfileInfo'

export default function ProfilePage(): JSX.Element {
  return (
    <Container padding={false}>
      <ProfileHeader mbti="ISTJ" />
      <ProfileInfo />
    </Container>
  )
}
