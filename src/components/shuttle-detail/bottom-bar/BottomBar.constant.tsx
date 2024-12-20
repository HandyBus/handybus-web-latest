import KakaoIcon from 'public/icons/kakao-colored.svg';
import TwitterIcon from 'public/icons/twitter-colored.svg';
import LinkIcon from 'public/icons/link.svg';

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
