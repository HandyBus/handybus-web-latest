'use client';

import { useAppMessageListener } from '@/hooks/webview/useWebViewMessageListener';
import { usePutUser } from '@/services/user.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import dayjs from 'dayjs';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import {
  getPendingPushToken,
  removePendingPushToken,
  setPendingPushToken,
} from '@/utils/localStorage';

const GlobalWebViewListener = () => {
  const { mutateAsync: updateUser } = usePutUser();

  useAppMessageListener(
    'PUSH_TOKEN',
    async (payload) => {
      const isLoggedIn = getIsLoggedIn();
      if (!isLoggedIn) return;

      try {
        await updateUser({ pushToken: payload.token ?? null });
        removePendingPushToken();
      } catch (error) {
        setPendingPushToken(payload.token ?? null);
        console.error(error);
        Sentry.captureException(error, {
          tags: {
            component: 'GlobalWebViewListener',
            page: 'layout-global-webview-listener',
            feature: 'push-token',
            action: 'update-push-token-failed',
            environment: process.env.NODE_ENV || 'development',
          },
          extra: {
            timestamp: dayjs().toISOString(),
          },
        });
      }
    },
    [updateUser],
  );

  // 앱의 웹뷰가 포어그라운드 되었 서버와 푸시토큰 동기화 시도
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        const isLoggedIn = getIsLoggedIn();
        const pending = getPendingPushToken();
        if (!isLoggedIn || !pending) return;

        try {
          await updateUser({ pushToken: pending.token ?? null });
          removePendingPushToken();
        } catch (error) {
          console.error(error);
          Sentry.captureException(error, {
            tags: {
              component: 'GlobalWebViewListener',
              page: 'layout-global-webview-listener',
              feature: 'sync-push-token',
              action: 'sync-push-token-failed',
              environment: process.env.NODE_ENV || 'development',
            },
            extra: {
              timestamp: dayjs().toISOString(),
            },
          });
        }
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
