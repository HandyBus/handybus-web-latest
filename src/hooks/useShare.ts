import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

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

export const useShare = (
  currentUrl: string,
  closeBottomSheet: () => void,
  shuttleName?: string,
) => {
  const pathname = usePathname();

  const shareToTwitter = () => {
    const text = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    closeBottomSheet();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('링크가 복사되었습니다.');
    } catch {
      toast.error('링크 복사에 실패했습니다.');
    } finally {
      closeBottomSheet();
    }
  };

  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  };

  const shareToKakao = (name = shuttleName) => {
    if (!window.Kakao || !name) {
      alert('카카오톡 공유하기를 사용할 수 없습니다.');
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: 115434,
      templateArgs: {
        shuttleName: name,
        path: pathname,
      },
    });

    closeBottomSheet();
  };

  return {
    shareToTwitter,
    copyToClipboard,
    initializeKakao,
    shareToKakao,
  };
};
