import React from 'react'
import { useRoute } from '@react-navigation/native'
import { CommonWebView } from '../../components/web-view/CommonWebView'

export default function IntroScreen() {
  const route = useRoute()
  const uri = '/' + route.name

  return <CommonWebView source={{ uri }} />
}
