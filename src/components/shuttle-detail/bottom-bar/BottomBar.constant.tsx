import KakaoIcon from 'public/icons/kakao-colored.svg';
import TwitterIcon from 'public/icons/twitter-colored.svg';
import InstagramIcon from 'public/icons/instagram-colored.svg';
import LinkIcon from 'public/icons/link.svg';

export const SHARE_BUTTONS = [
  {
    icon: KakaoIcon,
    text: '카카오톡',
    subText: '으로 공유하기',
    onClick: () => {},
  },
  {
    icon: TwitterIcon,
    text: '트위터',
    subText: '로 공유하기',
    onClick: () => {},
  },
  {
    icon: InstagramIcon,
    text: '인스타그램',
    subText: '으로 공유하기',
    onClick: () => {},
  },
  {
    icon: LinkIcon,
    text: '',
    subText: '링크 복사하기',
    onClick: () => {},
  },
] as const;
