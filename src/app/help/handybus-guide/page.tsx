'use client';

import Image from 'next/image';
import guideImage from './images/handybus-guide.png';
import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GuideContent from './components/GuideContent';

interface Props {
  searchParams: {
    tab?: string;
  };
}

const HandybusGuide = ({ searchParams }: Props) => {
  const tabFromQuery = searchParams.tab;
  const { replace } = useRouter();

  const [currentTab, setCurrentTab] = useState<TabValue>(
    getTabFromQuery(tabFromQuery),
  );

  const handleChangeTab = (value: TabValue) => {
    setCurrentTab(value);
    replace(`/help/handybus-guide?tab=${getTabQueryValue(value)}`);
  };

  return (
    <main>
      <figure>
        <Image src={guideImage} alt="핸디버스 가이드" quality={100} />
      </figure>
      <article className="relative mx-16 mb-16 flex flex-col">
        <Tabs
          items={[
            { label: '셔틀버스', value: 'SHUTTLE_BUS' },
            { label: '핸디팟', value: 'HANDY_PARTY' },
          ]}
          selected={currentTab}
          onSelect={handleChangeTab}
          className="absolute -left-16 mt-16 w-[calc(100%+32px)]"
        />
        <GuideContent currentTab={currentTab} />
      </article>
    </main>
  );
};

export default HandybusGuide;

export type TabValue = 'SHUTTLE_BUS' | 'HANDY_PARTY';
type TabQueryValue = 'shuttle-bus' | 'handy-party';

const TAB_QUERY_MAP: Record<TabValue, TabQueryValue> = {
  SHUTTLE_BUS: 'shuttle-bus',
  HANDY_PARTY: 'handy-party',
} as const;

const QUERY_TAB_MAP: Record<TabQueryValue, TabValue> = {
  'shuttle-bus': 'SHUTTLE_BUS',
  'handy-party': 'HANDY_PARTY',
} as const;

const getTabQueryValue = (tab: TabValue): TabQueryValue => {
  return TAB_QUERY_MAP[tab];
};

const isValidTabQueryValue = (value: string): value is TabQueryValue => {
  return value === 'shuttle-bus' || value === 'handy-party';
};

const getTabFromQuery = (queryValue: string | undefined): TabValue => {
  if (queryValue && isValidTabQueryValue(queryValue)) {
    return QUERY_TAB_MAP[queryValue];
  }
  return 'SHUTTLE_BUS';
};
