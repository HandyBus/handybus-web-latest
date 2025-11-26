'use client';

import { ReactNode, useEffect, useState } from 'react';
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
import { useActivity } from '@stackflow/react';
import { ActivityName } from '@/stacks';

const NavBar = () => {
  const activity = useActivity();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, [activity]);

  const getNavItems = () => {
    const baseItems = [
      {
        name: '홈',
        href: '/',
        activityName: 'Home',
        isSelected: activity.name === 'Home',
        icon: <HomeIcon />,
        selectedIcon: <HomeSelectedIcon />,
        clickedIcon: <HomeClickedIcon />,
        requiresLogin: false,
      },
      {
        name: '탐색',
        href: '/event/',
        activityName: 'EventList',
        isSelected: activity.name === 'EventList',
        icon: <ExploreIcon />,
        selectedIcon: <ExploreSelectedIcon />,
        clickedIcon: <ExploreClickedIcon />,
        requiresLogin: false,
      },
      {
        name: '참여/내역',
        href: '/history/',
        activityName: 'History',
        isSelected: activity.name === 'History',
        icon: <HistoryIcon />,
        selectedIcon: <HistorySelectedIcon />,
        clickedIcon: <HistoryClickedIcon />,
        requiresLogin: true,
      },
      {
        name: '마이',
        href: '/mypage/',
        activityName: 'MyPage',
        icon: <MyPageIcon />,
        isSelected: activity.name === 'MyPage',
        selectedIcon: <MyPageSelectedIcon />,
        clickedIcon: <MyPageClickedIcon />,
        requiresLogin: true,
      },
    ] as const;

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      <div className="fixed bottom-0 z-50 mx-auto flex h-[58px] w-full max-w-500 items-center justify-center border-t border-basic-grey-200 bg-basic-white px-16">
        <div className="flex w-full max-w-[400px] items-center justify-between">
          <div className="flex items-center">
            <TicketNavButton
              isSelected={activity.name === 'Ticket'}
              isLoggedIn={isLoggedIn}
            />
          </div>
          <div className="h-[46px] w-[1px] bg-basic-grey-200" />
          {navItems.map((item) => (
            <div key={item.name} className="flex items-center">
              <NavButton
                name={item.name}
                href={item.href}
                activityName={item.activityName}
                isSelected={item.isSelected}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
                clickedIcon={item.clickedIcon}
                requiresLogin={item.requiresLogin}
                isLoggedIn={isLoggedIn}
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

interface useNavNavigationProps {
  activityName: ActivityName;
  href: string;
  requiresLogin: boolean;
  isLoggedIn: boolean;
}

const useNavNavigation = ({
  activityName,
  href,
  requiresLogin,
  isLoggedIn,
}: useNavNavigationProps) => {
  const flow = useFlow();

  const navigateToNavActivity = () => {
    if (requiresLogin && !isLoggedIn) {
      flow.push('Login', { redirectUrl: href });
      return;
    }

    flow.replace(activityName, {}, { animate: false });
  };

  return { navigateToNavActivity };
};

interface NavButtonProps {
  name: string;
  href: string;
  icon: ReactNode;
  activityName: ActivityName;
  isSelected: boolean;
  selectedIcon: ReactNode;
  clickedIcon: ReactNode;
  requiresLogin: boolean;
  isLoggedIn: boolean;
}

const NavButton = ({
  name,
  href,
  icon,
  activityName,
  isSelected,
  selectedIcon,
  clickedIcon,
  requiresLogin,
  isLoggedIn,
}: NavButtonProps) => {
  const { navigateToNavActivity } = useNavNavigation({
    activityName,
    href,
    requiresLogin,
    isLoggedIn,
  });

  const hasMultipleIcons = selectedIcon && clickedIcon;

  return (
    <button
      type="button"
      onClick={navigateToNavActivity}
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

interface TicketNavButtonProps {
  isSelected: boolean;
  isLoggedIn: boolean;
}

const TicketNavButton = ({ isSelected, isLoggedIn }: TicketNavButtonProps) => {
  const { navigateToNavActivity } = useNavNavigation({
    activityName: 'Ticket',
    requiresLogin: true,
    href: '/ticket',
    isLoggedIn,
  });

  return (
    <button
      type="button"
      onClick={navigateToNavActivity}
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
