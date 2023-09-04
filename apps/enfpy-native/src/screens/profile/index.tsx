import React from 'react';
import {CommonWebView} from '../../components/web-view/CommonWebView';

export default function ProfileScreen() {
  return <CommonWebView source={{uri: '/profile'}} />;
}
