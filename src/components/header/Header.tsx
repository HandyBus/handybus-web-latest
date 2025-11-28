'use client';

import LogoIcon from 'public/icons/logo-v3.svg';
import BackIcon from './icons/back.svg';
import HomeIcon from './icons/home.svg';
import AnnouncementsIcon from './icons/announcement.svg';
import { ACTIVITY_NAME_TO_PAGE_NAME, ActivityName, useFlow } from '@/stacks';
import { useActivity } from '@stackflow/react';
import usePopAll from '@/hooks/usePopAll';
import { useState, useEffect } from 'react';

const Header = () => {
  // 경로에 따른 페이지명 표시
  const flow = useFlow();
  const activity = useActivity();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    setPageName(
      ACTIVITY_NAME_TO_PAGE_NAME[activity.name as ActivityName] || '',
    );
  }, [activity.name]);

  const isHome = activity.name === 'Home';

  const isHideBackButton = STACK_NAME_TO_HIDE_BACK_BUTTON.includes(
    activity.name,
  );

  const popAll = usePopAll();
  const handleBackClick = () => {
    const isRoot = activity.isRoot;
    if (!isRoot) {
      flow.pop();
    } else {
      popAll({ animate: false });
      flow.replace('Home', {}, { animate: false });
    }
  };
  const handleHomeClick = () => {
    popAll({ animate: false });
    flow.replace('Home', {}, { animate: false });
  };
  const handleAnnouncementsClick = () => {
    flow.push('AnnouncementList', {});
  };

  return (
    <>
      <header className="fixed top-0 z-50 flex h-56 w-full max-w-500 items-center justify-between bg-basic-white px-16">
        {isHome ? (
          <LogoIcon />
        ) : (
          <div className="flex items-center">
            {!isHideBackButton && (
              <button type="button" onClick={handleBackClick}>
                <BackIcon />
              </button>
            )}
            <h1 className="text-18 font-700 leading-[140%] text-basic-black">
              {pageName}
            </h1>
          </div>
        )}

        <div className="flex items-center gap-8">
          {!isHome && (
            <button type="button" onClick={handleHomeClick}>
              <HomeIcon />
            </button>
          )}
          <button type="button" onClick={handleAnnouncementsClick}>
            <AnnouncementsIcon />
          </button>
        </div>
      </header>
      <div className="h-56 shrink-0" aria-hidden="true" />
    </>
  );
};

export default Header;

const STACK_NAME_TO_HIDE_BACK_BUTTON = [
  'Home',
  'EventList',
  'History',
  'MyPage',
  'Ticket',
];
