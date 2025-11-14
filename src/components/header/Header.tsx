'use client';

import Link from 'next/link';
import LogoIcon from 'public/icons/logo-v3.svg';
import AnnouncementsIcon from './icons/announcement.svg';

// NOTE: 앱 환경에서는 네이티브 헤더를 사용합니다.
const Header = () => {
  return (
    <>
      <header className="fixed top-0 z-50 flex h-56 w-full max-w-500 items-center justify-between bg-basic-white px-16">
        <Link href="/">
          <LogoIcon />
        </Link>
        <Link href="/announcements">
          <AnnouncementsIcon />
        </Link>
      </header>
      <div className="h-56" aria-hidden="true" />
    </>
  );
};

export default Header;
