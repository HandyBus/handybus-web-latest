'use client';

import Header from '@/components/header/Header';
import Image from 'next/image';
import guideImage from './images/handybus-guide.png';
import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import GuideContent from './components/GuideContent';

export type TabValue = 'SHUTTLE_BUS' | 'HANDY_PARTY';

interface Params {
  tab: TabValue;
}

const HandybusGuide = ({ tab }: Params) => {
  const [currentTab, setCurrentTab] = useState<TabValue>(tab || 'SHUTTLE_BUS');

  const handleChangeTab = (value: TabValue) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Header />
      <main>
        <figure>
          <Image src={guideImage} alt="핸디버스 가이드" quality={100} />
        </figure>
        <article className="relative mx-16 mb-16 flex flex-col">
          <Tabs
            items={
              [
                { label: '셔틀버스', value: 'SHUTTLE_BUS' },
                { label: '핸디팟', value: 'HANDY_PARTY' },
              ] as const
            }
            selected={currentTab}
            onSelect={handleChangeTab}
            className="absolute -left-16 mt-16 w-[calc(100%+32px)]"
          />
          <GuideContent currentTab={currentTab} />
        </article>
      </main>
    </>
  );
};

export default HandybusGuide;
