'use client';

import Link from 'next/link';
import HomeIcon from './icons/home.svg';
import HomeSelectedIcon from './icons/home-selected.svg';
import HomeClickedIcon from './icons/home-clicked.svg';
import ExploreIcon from './icons/explore.svg';
import ExploreSelectedIcon from './icons/explore-selected.svg';
import ExploreClickedIcon from './icons/explore-clicked.svg';
import HistoryIcon from './icons/history.svg';
import HistorySelectedIcon from './icons/history-selected.svg';
import HistoryClickedIcon from './icons/history-clicked.svg';
import MyPageIcon from './icons/mypage.svg';
import MyPageSelectedIcon from './icons/mypage-selected.svg';
import MyPageClickedIcon from './icons/mypage-clicked.svg';
import TicketIcon from './icons/ticket.svg';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { customTwMerge } from 'tailwind.config';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);
  return (
    <>
      <div className="fixed bottom-0 right-[calc(max(0px,calc(100dvw-1280px)/2))] z-50 flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16">
        <div className="flex w-full max-w-[400px] items-center justify-between">
          <TicketNavButton
            name="탑승권"
            href={isLoggedIn ? '/ticket' : '/login'}
            icon={<TicketIcon />}
          />
          <div className="h-[46px] w-[1px] bg-basic-grey-200" />
          <NavButton
            name="홈"
            href="/"
            icon={<HomeIcon />}
            selectedIcon={<HomeSelectedIcon />}
            clickedIcon={<HomeClickedIcon />}
          />
          <NavButton
            name="탐색"
            href="/event"
            icon={<ExploreIcon />}
            selectedIcon={<ExploreSelectedIcon />}
            clickedIcon={<ExploreClickedIcon />}
          />
          <NavButton
            name="참여/내역"
            href={isLoggedIn ? '/history' : createLoginRedirectPath('/history')}
            icon={<HistoryIcon />}
            selectedIcon={<HistorySelectedIcon />}
            clickedIcon={<HistoryClickedIcon />}
          />
          <NavButton
            name="마이"
            href={isLoggedIn ? '/mypage' : createLoginRedirectPath('/mypage')}
            icon={<MyPageIcon />}
            selectedIcon={<MyPageSelectedIcon />}
            clickedIcon={<MyPageClickedIcon />}
          />
        </div>
      </div>
      <div className="h-[58px]" aria-hidden="true" />
    </>
  );
};

export default NavBar;

interface NavButtonProps {
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  clickedIcon: ReactNode;
}

const NavButton = ({
  name,
  href,
  icon,
  selectedIcon,
  clickedIcon,
}: NavButtonProps) => {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <Link
      href={href}
      className="group flex w-44 flex-col items-center justify-center px-8"
    >
      <div className="flex h-32 w-32 items-center justify-center group-active:hidden">
        {isSelected ? selectedIcon : icon}
      </div>
      <div className="hidden h-32 w-32 items-center justify-center group-active:flex">
        {isSelected ? selectedIcon : clickedIcon}
      </div>
      <div
        className={customTwMerge(
          'flex h-[19px] items-center justify-center whitespace-nowrap break-keep text-12 font-600 leading-[160%] text-basic-grey-600',
          isSelected && 'font-700 text-basic-black',
        )}
      >
        {name}
      </div>
    </Link>
  );
};

interface TicketNavButtonProps {
  name: string;
  href: string;
  icon: ReactNode;
}

const TicketNavButton = ({ name, href, icon }: TicketNavButtonProps) => {
  const pathname = usePathname();
  const isSelected = pathname === href;
  return (
    <Link
      href={href}
      className="flex w-44 flex-col items-center justify-center rounded-4 px-8 active:bg-basic-grey-100"
    >
      <div className="flex h-32 w-32 items-center justify-center">{icon}</div>
      <div
        className={customTwMerge(
          'flex h-[19px] items-center justify-center whitespace-nowrap break-keep text-12 font-600 leading-[160%] text-basic-grey-600',
          isSelected && 'font-700 text-basic-black',
        )}
      >
        {name}
      </div>
    </Link>
  );
};
