'use client';

import UserIcon from 'public/icons/user.svg';
import LogoIcon from 'public/icons/logo-v2.svg';
import Link from 'next/link';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import { useGetUser } from '@/services/user.service';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { data: user } = useGetUser({
    enabled: isLoggedIn !== null && isLoggedIn,
  });
  const profileImage = user?.profileImage;
  const nickname = user?.nickname;

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
      {isLoggedIn !== null &&
        (isLoggedIn ? (
          <Link href="/mypage">
            <UserProfile nickname={nickname} profileImage={profileImage} />
          </Link>
        ) : (
          <Link href="/login">
            <UserIcon />
          </Link>
        ))}
    </header>
  );
};

export default Header;
