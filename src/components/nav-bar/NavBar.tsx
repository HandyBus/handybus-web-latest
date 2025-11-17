'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { customTwMerge } from 'tailwind.config';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useFlow } from '@/stacks';
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

const ROUTE_TO_ACTIVITY_MAP: Record<string, string> = {
  '/': 'Home',
  '/event': 'EventList',
  '/history': 'History',
  '/mypage': 'MyPage',
  '/ticket': 'Ticket',
  '/login': 'Home',
} as const;

const DEFAULT_ACTIVITY = 'Home';

interface NavItemConfig {
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon?: ReactNode;
  clickedIcon?: ReactNode;
  isTicketButton?: boolean;
}

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);

  const getNavItems = (): NavItemConfig[] => {
    const baseItems: NavItemConfig[] = [
      {
        name: '탑승권',
        href: isLoggedIn ? '/ticket' : '/login',
        icon: <TicketIcon />,
        isTicketButton: true,
      },
      {
        name: '홈',
        href: '/',
        icon: <HomeIcon />,
        selectedIcon: <HomeSelectedIcon />,
        clickedIcon: <HomeClickedIcon />,
      },
      {
        name: '탐색',
        href: '/event',
        icon: <ExploreIcon />,
        selectedIcon: <ExploreSelectedIcon />,
        clickedIcon: <ExploreClickedIcon />,
      },
      {
        name: '참여/내역',
        href: isLoggedIn ? '/history' : '/login',
        icon: <HistoryIcon />,
        selectedIcon: <HistorySelectedIcon />,
        clickedIcon: <HistoryClickedIcon />,
      },
      {
        name: '마이',
        href: isLoggedIn ? '/mypage' : '/login',
        icon: <MyPageIcon />,
        selectedIcon: <MyPageSelectedIcon />,
        clickedIcon: <MyPageClickedIcon />,
      },
    ];

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      <div className="fixed bottom-0 z-50 mx-auto flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16">
        <div className="flex w-full max-w-[400px] items-center justify-between">
          {navItems.map((item, index) => (
            <>
              <div key={item.name} className="flex items-center">
                <NavButton
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                  selectedIcon={item.selectedIcon}
                  clickedIcon={item.clickedIcon}
                  isTicketButton={item.isTicketButton}
                />
              </div>
              {index === 0 && (
                <div className="h-[46px] w-[1px] bg-basic-grey-200" />
              )}
            </>
          ))}
        </div>
      </div>
      <div className="h-[58px] shrink-0" aria-hidden="true" />
    </>
  );
};

export default NavBar;

// Hooks
const useNavigation = () => {
  const flow = useFlow();

  const navigateToActivity = (href: string) => {
    const activityName = ROUTE_TO_ACTIVITY_MAP[href] || DEFAULT_ACTIVITY;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flow.replace(activityName as any, {}, { animate: false });
  };

  return { navigateToActivity };
};

interface NavButtonProps {
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon?: ReactNode;
  clickedIcon?: ReactNode;
  isTicketButton?: boolean;
}

// Components
const NavButton = ({
  name,
  href,
  icon,
  selectedIcon,
  clickedIcon,
  isTicketButton = false,
}: NavButtonProps) => {
  const pathname = usePathname();
  const parsedPathname =
    pathname.length === 1
      ? '/'
      : pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
  const isSelected = parsedPathname === href;
  const { navigateToActivity } = useNavigation();

  const handleClick = () => {
    navigateToActivity(href);
  };

  const hasMultipleIcons = selectedIcon && clickedIcon;

  if (isTicketButton) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex w-44 flex-col items-center justify-center rounded-4 px-8 text-left active:bg-basic-grey-100"
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
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-44 flex-col items-center justify-center px-8 text-left"
    >
      {hasMultipleIcons ? (
        <>
          <div className="flex h-32 w-32 items-center justify-center group-active:hidden">
            {isSelected ? selectedIcon : icon}
          </div>
          <div className="hidden h-32 w-32 items-center justify-center group-active:flex">
            {isSelected ? selectedIcon : clickedIcon}
          </div>
        </>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center">{icon}</div>
      )}
      <div
        className={customTwMerge(
          'flex h-[19px] items-center justify-center whitespace-nowrap break-keep text-12 font-600 leading-[160%] text-basic-grey-600',
          isSelected && 'font-700 text-basic-black',
        )}
      >
        {name}
      </div>
    </button>
  );
};
