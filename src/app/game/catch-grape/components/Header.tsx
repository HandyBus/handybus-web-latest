'use client';

import { useRouter } from 'next/navigation';
import CloseIcon from 'public/icons/close.svg';
import ShareIcon from './icons/share.svg';
import { pushDataLayerEvent } from '@/utils/analytics/dataLayer.util';

const Header = () => {
  const router = useRouter();

  const handleClose = () => {
    router.replace('/');
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      const shareUrl = `${window.location.origin}/game/catch-grape?utm_source=share&utm_medium=share&utm_campaign=catch_grape`;
      await navigator.share({
        text: `이번 티켓팅, 맹연습해서 같이 성공할까요? ${shareUrl}`,
      });
      pushDataLayerEvent('catch_grape_click', {
        type: 'share_header',
      });
    } catch (error) {
      console.error('handleShare Error:', error);
    }
  };

  return (
    <>
      <header className="fixed-centered-layout top-0 z-50 flex items-center justify-between bg-basic-white px-16 py-12">
        <div className="flex items-center gap-8">
          <button type="button" onClick={handleClose}>
            <CloseIcon className="h-24 w-24" />
          </button>
          <h1 className="text-18 font-700 leading-[140%] text-basic-black">
            포도알 게임
          </h1>
        </div>
        <button type="button" onClick={handleShare}>
          <ShareIcon className="h-32 w-32" />
        </button>
      </header>
      <div className="h-56 w-full shrink-0" aria-hidden="true" />
    </>
  );
};

export default Header;
