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
  '/login': 'Login',
} as const;

const DEFAULT_ACTIVITY = 'Home';

interface NavItemConfig {
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon?: ReactNode;
  clickedIcon?: ReactNode;
  animate?: boolean;
  replace?: boolean;
}

const NavBar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, [pathname]);

  const getNavItems = (): NavItemConfig[] => {
    const baseItems: NavItemConfig[] = [
      {
        name: '홈',
        href: '/',
        icon: <HomeIcon />,
        selectedIcon: <HomeSelectedIcon />,
        clickedIcon: <HomeClickedIcon />,
        animate: false,
        replace: true,
      },
      {
        name: '탐색',
        href: '/event',
        icon: <ExploreIcon />,
        selectedIcon: <ExploreSelectedIcon />,
        clickedIcon: <ExploreClickedIcon />,
        animate: false,
        replace: true,
      },
      {
        name: '참여/내역',
        href: isLoggedIn ? '/history' : '/login',
        icon: <HistoryIcon />,
        selectedIcon: <HistorySelectedIcon />,
        clickedIcon: <HistoryClickedIcon />,
        animate: !isLoggedIn,
        replace: isLoggedIn,
      },
      {
        name: '마이',
        href: isLoggedIn ? '/mypage' : '/login',
        icon: <MyPageIcon />,
        selectedIcon: <MyPageSelectedIcon />,
        clickedIcon: <MyPageClickedIcon />,
        animate: !isLoggedIn,
        replace: isLoggedIn,
      },
    ];

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      <div className="fixed bottom-0 z-50 mx-auto flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16">
        <div className="flex w-full max-w-[400px] items-center justify-between">
          <div className="flex items-center">
            <TicketNavButton isLoggedIn={isLoggedIn} />
          </div>
          <div className="h-[46px] w-[1px] bg-basic-grey-200" />
          {navItems.map((item) => (
            <div key={item.name} className="flex items-center">
              <NavButton
                name={item.name}
                href={item.href}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
                clickedIcon={item.clickedIcon}
                animate={item.animate}
                replace={item.replace}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[58px] shrink-0" aria-hidden="true" />
    </>
  );
};

export default NavBar;

interface useNavigationProps {
  animate?: boolean;
  replace?: boolean;
}

const useNavigation = ({
  animate = false,
  replace = true,
}: useNavigationProps) => {
  const flow = useFlow();

  const navigateToActivity = (href: string) => {
    const activityName = ROUTE_TO_ACTIVITY_MAP[href] || DEFAULT_ACTIVITY;
    if (replace) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      flow.replace(activityName as any, {}, { animate });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      flow.push(activityName as any, {}, { animate });
    }
  };

  return { navigateToActivity };
};

interface TicketNavButtonProps {
  isLoggedIn: boolean;
}

const TicketNavButton = ({ isLoggedIn }: TicketNavButtonProps) => {
  const pathname = usePathname();
  const href = isLoggedIn ? '/ticket' : '/login';
  const parsedPathname =
    pathname.length === 1
      ? '/'
      : pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
  const isSelected = href === '/login' ? false : parsedPathname === href;
  const { navigateToActivity } = useNavigation({
    animate: !isLoggedIn,
    replace: isLoggedIn,
  });

  const handleClick = () => {
    navigateToActivity(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-44 flex-col items-center justify-center rounded-4 px-8 text-left active:bg-basic-grey-100"
    >
      <div className="flex h-32 w-32 items-center justify-center">
        <TicketIcon />
      </div>
      <div
        className={customTwMerge(
          'flex h-[19px] items-center justify-center whitespace-nowrap break-keep text-12 font-600 leading-[160%] text-basic-grey-600',
          isSelected && 'font-700 text-basic-black',
        )}
      >
        탑승권
      </div>
    </button>
  );
};

interface NavButtonProps {
  name: string;
  href: string;
  icon: ReactNode;
  selectedIcon?: ReactNode;
  clickedIcon?: ReactNode;
  animate?: boolean;
  replace?: boolean;
}

const NavButton = ({
  name,
  href,
  icon,
  selectedIcon,
  clickedIcon,
  animate = false,
  replace = false,
}: NavButtonProps) => {
  const pathname = usePathname();
  const parsedPathname =
    pathname.length === 1
      ? '/'
      : pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
  const isSelected = href === '/login' ? false : parsedPathname === href;
  const { navigateToActivity } = useNavigation({ animate, replace });

  const handleClick = () => {
    navigateToActivity(href);
  };

  const hasMultipleIcons = selectedIcon && clickedIcon;

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
