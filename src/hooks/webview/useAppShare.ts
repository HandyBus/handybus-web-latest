'use client';

import { useCallback } from 'react';
import useWebViewMessage from './useWebViewMessage';

const useAppShare = () => {
  const { sendRequest, isApp } = useWebViewMessage();

  const share = useCallback(
    async (params: {
      title?: string;
      message?: string;
      url: string;
    }): Promise<boolean> => {
      if (isApp) {
        // 앱 환경: SHARE 요청 후 SHARE_RESULT 응답 대기
        try {
          const result = await sendRequest(
            'SHARE',
            params,
            'SHARE_RESULT',
            30000, // 공유 시트가 열려있을 수 있으므로 타임아웃 넉넉히 설정
          );
          console.log('[WebView] Share result:', result);
          return result.isSuccess;
        } catch {
          console.error('[WebView] Share request failed or timed out');
          return false;
        }
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
    [sendRequest, isApp],
  );

  return share;
};

export default useAppShare;
