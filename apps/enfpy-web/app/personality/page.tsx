'use client'

import { Container } from '@vrew/ui'
import PersonalityList from '../../features/personality/PersonalityList'
export default function Page(): JSX.Element {
  return (
    <Container fullScreen className="pt-[16px]">
      <PersonalityList />
    </Container>
  )
}
