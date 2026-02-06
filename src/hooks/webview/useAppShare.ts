'use client';

import { useCallback } from 'react';
import useWebViewMessage from './useWebViewMessage';

const useAppShare = () => {
  const { sendMessage, isApp } = useWebViewMessage();

  const share = useCallback(
    async (params: {
      title?: string;
      message?: string;
      url: string;
    }): Promise<boolean> => {
      if (isApp) {
        // 앱 환경: 메시지 전송 성공 여부만 반환
        // TODO: 앱 환경에서 공유 완료 여부를 확인하는 로직 추가
        return sendMessage('SHARE', params);
      } else {
        // 웹 환경에서는 Web Share API 사용
        if (navigator.share) {
          try {
            await navigator.share({
              title: params.title,
              text: params.message,
              url: params.url,
            });
            // 공유가 성공적으로 완료된 경우
            return true;
          } catch (error) {
            // 사용자가 공유를 취소한 경우 (AbortError) 또는 다른 에러
            // AbortError는 사용자가 공유를 취소한 것이므로 false 반환
            if (error instanceof Error && error.name === 'AbortError') {
              console.log('[WebView] Share cancelled by user');
            } else {
              console.error('[WebView] Share error:', error);
            }
            return false;
          }
        } else {
          console.log('[WebView] Web Share API not supported');
          return false;
        }
      }
    },
    [sendMessage, isApp],
  );

  return share;
};

export default useAppShare;
