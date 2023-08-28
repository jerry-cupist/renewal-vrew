import React from 'react';
import {Text, View} from 'react-native';
import {CommonWebView} from '../../components/web-view/CommonWebView';

export default function Main() {
  return (
    <>
      <View>
        <Text>😃This is main screen.</Text>
      </View>
      <CommonWebView source={{uri: 'http://localhost:3000/'}} />
    </>
  );
}
