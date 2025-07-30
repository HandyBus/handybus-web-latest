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
  const name = user?.name ?? user?.nickname;

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

      <div className="flex items-center gap-8">
        <Link
          href="/event"
          className="px-4 text-14 font-600 active:text-basic-grey-600"
        >
          모든 행사
        </Link>
        <div className="h-16 w-[1px] bg-basic-grey-200" />
        <div className="h-24 w-24">
          {isLoggedIn !== null &&
            (isLoggedIn ? (
              <Link href="/mypage" className="group relative">
                <div className="absolute inset-0 hidden h-full w-full rounded-full bg-[rgba(0,0,0,0.4)] group-active:block" />
                <UserProfile name={name} profileImage={profileImage} />
              </Link>
            ) : (
              <Link href="/login">
                <UserIcon />
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
