'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { RefObject } from 'react';
import { useShare } from '@/hooks/useShare';
import KakaoIcon from 'public/icons/kakao-colored.svg';
import TwitterIcon from 'public/icons/twitter-colored.svg';
import LinkIcon from 'public/icons/link.svg';

interface ShareSheetProps {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
  closeBottomSheet: () => void;
  eventName: string;
}

const ShareSheet = ({
  bottomSheetRef,
  contentRef,
  closeBottomSheet,
  eventName,
}: ShareSheetProps) => {
  const { shareToTwitter, copyToClipboard, shareToKakao, KakaoScript } =
    useShare({
      eventName,
    });

  const handleShare = (platform: SharePlatform) => {
    switch (platform) {
      case SHARE_PLATFORM.KAKAO:
        shareToKakao();
        closeBottomSheet();
        break;
      case SHARE_PLATFORM.TWITTER:
        shareToTwitter();
        closeBottomSheet();
        break;
      case SHARE_PLATFORM.LINK:
        copyToClipboard();
        closeBottomSheet();
        break;
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        title="공유하기"
        description="친구들과 함께 핸디버스를 타요"
      >
        <div
          ref={contentRef}
          className="w-full overflow-y-hidden text-16 font-400 leading-[24px] text-basic-grey-700"
        >
          {SHARE_BUTTONS.map((button) => (
            <button
              key={button.id}
              type="button"
              className="flex w-full items-center gap-16 py-16"
              onClick={() => handleShare(button.id)}
              aria-label={button.ariaLabel}
            >
              <button.icon
                viewBox="0 0 24 24"
                width={24}
                height={24}
                aria-hidden="true"
              />
              <p>
                {button.text && (
                  <span className="text-16 font-500 leading-[25.6px]">
                    {button.text}
                  </span>
                )}
                {button.subText}
              </p>
            </button>
          ))}
          <div className="h-[21px]" />
        </div>
      </BottomSheet>
      <KakaoScript />
    </>
  );
};

export default ShareSheet;

export const SHARE_PLATFORM = {
  KAKAO: 'kakao',
  TWITTER: 'twitter',
  LINK: 'link',
} as const;

export type SharePlatform =
  (typeof SHARE_PLATFORM)[keyof typeof SHARE_PLATFORM];

export interface ShareButtonType {
  id: SharePlatform;
  icon: typeof KakaoIcon;
  text: string;
  subText: string;
  ariaLabel: string;
}

export const SHARE_BUTTONS: readonly ShareButtonType[] = [
  {
    id: SHARE_PLATFORM.KAKAO,
    icon: KakaoIcon,
    text: '카카오톡',
    subText: '으로 공유하기',
    ariaLabel: '카카오톡으로 공유하기',
  },
  {
    id: SHARE_PLATFORM.TWITTER,
    icon: TwitterIcon,
    text: '트위터',
    subText: '로 공유하기',
    ariaLabel: '트위터로 공유하기',
  },
  {
    id: SHARE_PLATFORM.LINK,
    icon: LinkIcon,
    text: '',
    subText: '링크 복사하기',
    ariaLabel: '링크 복사하기',
  },
] as const;
