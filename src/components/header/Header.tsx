'use client';

import UserIcon from 'public/icons/user.svg';
import LogoIcon from 'public/icons/logo.svg';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-48 w-full items-center justify-between bg-white px-16 py-12">
      <Link href="/">
        <LogoIcon fill="black" />
      </Link>
      <Link href="/mypage">
        <UserIcon />
      </Link>
    </header>
  );
};

export default Header;
