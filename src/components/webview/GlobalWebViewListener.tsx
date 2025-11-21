'use client';

import { useAppMessageListener } from '@/hooks/webview/useWebViewMessageListener';
import { usePutUser } from '@/services/user.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { removePushToken, setPushToken } from '@/utils/localStorage';
import dayjs from 'dayjs';
import * as Sentry from '@sentry/nextjs';

const GlobalWebViewListener = () => {
  const { mutateAsync: updateUser } = usePutUser();

  useAppMessageListener(
    'PUSH_TOKEN',
    async (payload) => {
      const isLoggedIn = getIsLoggedIn();

      if (payload.token) {
        setPushToken(payload.token);
      } else removePushToken();
      if (!isLoggedIn) return;
      try {
        await updateUser({ pushToken: payload.token });
      } catch (error) {
        console.error(error);
        Sentry.captureException(error, {
          tags: {
            component: 'GlobalWebViewListener',
            page: 'layout-global-webview-listener',
            feature: 'push-token',
            action: 'update-push-token',
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

  return null;
};

export default GlobalWebViewListener;
