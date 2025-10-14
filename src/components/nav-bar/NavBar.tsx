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
import useAppRouter, { createAppRedirectPath } from '@/hooks/useAppRouter';
import { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { customTwMerge } from 'tailwind.config';

const NavBar = () => {
  return (
    <Suspense
      fallback={
        <div className="sticky bottom-0 z-50 mx-auto flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16" />
      }
    >
      <NavBarContent />
    </Suspense>
  );
};

export default NavBar;

const NavBarContent = () => {
  const { isApp } = useAppRouter();
  return (
    <div className="sticky bottom-0 z-50 mx-auto flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16">
      <div className="flex w-full max-w-[400px] items-center justify-between">
        <TicketNavButton
          isApp={isApp}
          name="탑승권"
          href="/ticket"
          icon={<TicketIcon />}
        />
        <div className="h-[46px] w-[1px] bg-basic-grey-200" />
        <NavButton
          isApp={isApp}
          name="홈"
          href="/"
          icon={<HomeIcon />}
          selectedIcon={<HomeSelectedIcon />}
          clickedIcon={<HomeClickedIcon />}
        />
        <NavButton
          isApp={isApp}
          name="탐색"
          href="/event"
          icon={<ExploreIcon />}
          selectedIcon={<ExploreSelectedIcon />}
          clickedIcon={<ExploreClickedIcon />}
        />
        <NavButton
          isApp={isApp}
          name="참여/내역"
          href="/history"
          icon={<HistoryIcon />}
          selectedIcon={<HistorySelectedIcon />}
          clickedIcon={<HistoryClickedIcon />}
        />
        <NavButton
          isApp={isApp}
          name="마이"
          href="/mypage"
          icon={<MyPageIcon />}
          selectedIcon={<MyPageSelectedIcon />}
          clickedIcon={<MyPageClickedIcon />}
        />
      </div>
    </div>
  );
};

interface NavButtonProps {
  isApp: boolean;
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  clickedIcon: ReactNode;
}

const NavButton = ({
  isApp,
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
      href={createAppRedirectPath(href, { isApp })}
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
  isApp: boolean;
  name: string;
  href: string;
  icon: ReactNode;
}

const TicketNavButton = ({ isApp, name, href, icon }: TicketNavButtonProps) => {
  return (
    <Link
      href={createAppRedirectPath(href, { isApp })}
      className="flex w-44 flex-col items-center justify-center rounded-4 px-8 active:bg-basic-grey-100"
    >
      <div className="flex h-32 w-32 items-center justify-center">{icon}</div>
      <div
        className={customTwMerge(
          'flex h-[19px] items-center justify-center whitespace-nowrap break-keep text-12 font-600 leading-[160%] text-basic-grey-600',
        )}
      >
        {name}
      </div>
    </Link>
  );
};
