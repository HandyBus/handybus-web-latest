import { useAtomValue } from 'jotai';
import useAppShare from '@/hooks/webview/useAppShare';
import { eventAtom } from '../../../store/eventAtom';

// 응원 캠페인 공유하기 훅
const useCheerShare = () => {
  const event = useAtomValue(eventAtom);
  const share = useAppShare();

  const handleShare = async (): Promise<boolean> => {
    if (!event) {
      return false;
    }

    const currentUrl = window.location.href;
    return await share({
      title: event.eventName,
      message: `${event.eventName} 응원하고 할인받기`,
      url: currentUrl,
    });
  };

  return { handleShare };
};

export default useCheerShare;
