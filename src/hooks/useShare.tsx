'use client';

import { toast } from 'react-toastify';
import Script from 'next/script';
import { useShareTracking } from './analytics/useShareTracking';

declare global {
  interface Window {
    Kakao: {
      init: (key: string | undefined) => void;
      isInitialized: () => boolean;
      Share: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sendCustom: (settings: any) => void;
      };
    };
  }
}

interface Props {
  eventId: string;
  eventName: string;
}

export const useShare = ({ eventId, eventName }: Props) => {
  const { trackShare } = useShareTracking({ eventId, eventName });
  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  };

  const KakaoScript = () => {
    return (
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        onLoad={initializeKakao}
        strategy="afterInteractive"
      />
    );
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareToTwitter = () => {
    const text = encodeURIComponent(currentUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
    trackShare('x');
  };

  const shareToKakao = () => {
    if (!window.Kakao || !eventName) {
      alert('카카오톡 공유하기를 사용할 수 없습니다.');
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: 115434,
      templateArgs: {
        name: eventName,
        path: currentUrl,
      },
    });

    trackShare('kakao');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      trackShare('copy');
      toast.success('링크를 복사했어요.');
    } catch {
      toast.error('링크를 복사하지 못했어요.');
    }
  };

  return {
    copyToClipboard,
    shareToTwitter,
    shareToKakao,
    KakaoScript,
  };
};
