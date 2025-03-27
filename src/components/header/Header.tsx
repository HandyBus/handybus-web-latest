'use client';

import UserIcon from 'public/icons/user.svg';
import LogoIcon from 'public/icons/logo-v2.svg';
import Link from 'next/link';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-48 w-full items-center justify-between bg-basic-white px-16 py-12">
      <h1 className="sr-only">핸디버스</h1>
      <Link href="/">
        <LogoIcon />
      </Link>
      {isLoggedIn != null &&
        (isLoggedIn ? (
          <Link href="/mypage">
            <UserProfile />
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex h-full w-72 items-center justify-center rounded-6 bg-basic-black text-14 font-400 text-basic-white"
          >
            <UserIcon />
          </Link>
        ))}
    </header>
  );
};

export default Header;
