import React, {useRef} from 'react';
import {
  CommonWebView,
  CommonWebViewRef,
} from '../components/web-view/CommonWebView';
import {ENFPY_WEB_URL} from '@vrew/modules/web-bridge/constants/page-enpfy';

import {View, Button} from 'react-native';
import {PostPhoneVerificationResponse} from '../../../../packages/apis/enfpy/auth';

export default function RootScreen() {
  const webviewRef = useRef<CommonWebViewRef>(null);

  const onClick = () => {
    if (!webviewRef.current) {
      return;
    }

    const {fetcher} = webviewRef.current;
    fetcher<PostPhoneVerificationResponse>({
      url: '/health-check',
      method: 'get',
    })
      .then(res => {
        console.log('[NETWORK]_RES: ', {res});
      })
      .catch((error: unknown) => {
        console.log('[NETWORK]_ERROR: ', {error});
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Button title="헬스체크" onPress={onClick} />
      <CommonWebView ref={webviewRef} source={{uri: ENFPY_WEB_URL.ROOT}} />
    </View>
  );
}
