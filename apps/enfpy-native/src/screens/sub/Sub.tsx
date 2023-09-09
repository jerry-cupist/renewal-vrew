import React from 'react'
import { CommonWebView } from '../../components/web-view/CommonWebView'
export default function Sub() {
  return <CommonWebView source={{ uri: 'http://localhost:3000/sub' }} />
}
