import React, { useEffect } from 'react'
import { CommonWebView } from '../../components/web-view/CommonWebView'
import { useRoute } from '@react-navigation/native'

export default function LoginScreen() {
  const route = useRoute()
  const uri = '/' + route.name

  useEffect(() => {
    console.log('LOGIN_SCREEN')
  }, [])

  return <CommonWebView source={{ uri }} />
}
