'use client';

import { useAppMessageListener } from '@/hooks/webview/useWebViewMessageListener';
import { usePutUser } from '@/services/user.service';
import { removePushToken, setPushToken } from '@/utils/localStorage';

const GlobalWebViewListener = () => {
  const { mutateAsync: updateUser } = usePutUser();

  useAppMessageListener(
    'PUSH_TOKEN',
    async (payload) => {
      if (payload.token) {
        setPushToken(payload.token);
      } else removePushToken();
      await updateUser({ pushToken: payload.token });
    },
    [updateUser],
  );

  return null;
};

export default GlobalWebViewListener;
