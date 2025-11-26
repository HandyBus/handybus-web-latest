'use client';

import Tabs from '@/components/tab/Tabs';
import { useSearchParams } from 'next/navigation';
import WritableReviews from './components/WritableReviews';
import WrittenReviews from './components/WrittenReviews';
import Header from '@/components/header/Header';
import { useFlow } from '@/stacks';

export type ReviewTabType = 'writable-reviews' | 'written-reviews';

const Reviews = () => {
  const flow = useFlow();
  const searchParams = useSearchParams();
  const currentTab: ReviewTabType =
    (searchParams.get('type') as ReviewTabType) || 'writable-reviews';

  const renderTab = () => {
    switch (currentTab) {
      case 'writable-reviews':
        return <WritableReviews />;
      case 'written-reviews':
        return <WrittenReviews />;
    }
  };

  const handleSelectTab = (nextTab: ReviewTabType) => {
    flow.replace('Reviews', { type: nextTab }, { animate: false });
  };

  return (
    <>
      <Header />
      <main className="relative grow bg-basic-grey-50">
        <Tabs
          items={[
            { label: '작성 가능한 후기', value: 'writable-reviews' },
            { label: '작성한 후기', value: 'written-reviews' },
          ]}
          selected={currentTab}
          onSelect={handleSelectTab}
          className="top-56"
        />
        {renderTab()}
      </main>
    </>
  );
};

export default Reviews;
