import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import KakaoIcon from '../icons/kakao.svg';
import XIcon from '../icons/x.svg';
import LinkIcon from '../icons/link.svg';
import { useShare } from '@/hooks/useShare';

type SharePlatform = 'kakao' | 'x' | 'copy';

interface ShareBottomSheetProps extends BottomSheetRefs {
  eventName: string;
  closeBottomSheet: () => void;
}

const ShareBottomSheet = ({
  bottomSheetRef,
  eventName,
  closeBottomSheet,
}: ShareBottomSheetProps) => {
  const { shareToKakao, shareToTwitter, copyToClipboard, KakaoScript } =
    useShare({
      eventName,
    });

  const handleShare = (platform: SharePlatform) => {
    switch (platform) {
      case 'kakao':
        shareToKakao();
        break;
      case 'x':
        shareToTwitter();
        break;
      case 'copy':
        copyToClipboard();
        break;
    }
    closeBottomSheet();
  };

  return (
    <>
      <BottomSheet ref={bottomSheetRef} title="친구들과 함께 타고 가세요">
        <div className="flex items-center justify-between px-16">
          <button
            type="button"
            onClick={() => handleShare('kakao')}
            className="my-12 flex flex-col items-center gap-8"
          >
            <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full">
              <KakaoIcon />
            </div>
            <span className="text-16 font-600 text-basic-grey-700">
              카카오톡
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleShare('x')}
            className="my-12 flex flex-col items-center gap-8"
          >
            <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-basic-black">
              <XIcon />
            </div>
            <span className="text-16 font-600 text-basic-grey-700">트위터</span>
          </button>
          <button
            type="button"
            onClick={() => handleShare('copy')}
            className="my-12 flex flex-col items-center gap-8"
          >
            <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-basic-grey-100">
              <LinkIcon />
            </div>
            <span className="text-16 font-600 text-basic-grey-700">
              링크 복사
            </span>
          </button>
        </div>
      </BottomSheet>
      <KakaoScript />
    </>
  );
};

export default ShareBottomSheet;
