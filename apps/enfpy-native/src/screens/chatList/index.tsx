import React from 'react'
import { CommonWebView } from '../../components/web-view/CommonWebView'
import { useRoute } from '@react-navigation/native'

export default function ChatListScreen() {
  const route = useRoute()
  const uri = '/' + route.name

  return <CommonWebView source={{ uri }} />
}
