'use client';

import { useAppMessageListener } from '@/hooks/webview/useWebViewMessageListener';
import { postNotificationEvent } from '@/services/notification.service';
import { putUserPushToken } from '@/services/user.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useEffect } from 'react';
import { getPendingPushToken } from '@/utils/localStorage';

const GlobalWebViewListener = () => {
  useAppMessageListener('PUSH_TOKEN', async (payload) => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) return;

    await putUserPushToken(payload.token ?? null);
  });

  useAppMessageListener('NOTIFICATION_OPENED', async (payload) => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) return;

    try {
      await postNotificationEvent({
        notificationDeliveryId: payload.notificationDeliveryId,
        eventType: 'OPEN',
      });
    } catch (error) {
      console.error(
        '[WebView] Failed to post notification opened event',
        error,
      );
    }
  });

  // 앱의 웹뷰가 포어그라운드 되었 서버와 푸시토큰 동기화 시도
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        const isLoggedIn = getIsLoggedIn();
        const pending = getPendingPushToken();
        if (!isLoggedIn || !pending) return;

        await putUserPushToken(pending.token ?? null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};

export default GlobalWebViewListener;
