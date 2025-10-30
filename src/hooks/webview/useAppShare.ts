'use client';

import { useCallback } from 'react';
import useWebViewMessage from './useWebViewMessage';

const useAppShare = () => {
  const { sendMessage, isApp } = useWebViewMessage();

  const share = useCallback(
    (params: { title?: string; message?: string; url: string }) => {
      if (isApp) {
        return sendMessage('SHARE', params);
      } else {
        // 웹 환경에서는 Web Share API 사용
        if (navigator.share) {
          navigator
            .share({
              title: params.title,
              text: params.message,
              url: params.url,
            })
            .catch((error) => {
              console.error('[WebShare] Error:', error);
            });
        } else {
          console.log('[Share] Web Share API not supported');
        }
        return false;
      }
    },
    [sendMessage, isApp],
  );

  return share;
};

export default useAppShare;
