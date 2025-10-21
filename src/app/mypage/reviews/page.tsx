'use client';

import Header from '@/components/header/Header';
import Tabs from '@/components/tab/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import WritableReviews from './components/WritableReviews';
import WrittenReviews from './components/WrittenReviews';

type ReviewTabType = 'writable-reviews' | 'written-reviews';

const Reviews = () => {
  const router = useRouter();
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
  return (
    <>
      <Header />
      <main className="grow bg-basic-grey-50">
        <Tabs
          items={[
            { label: '작성 가능한 후기', value: 'writable-reviews' },
            { label: '작성한 후기', value: 'written-reviews' },
          ]}
          selected={currentTab}
          onSelect={(value) => {
            router.replace(`/mypage/reviews?type=${value}`);
          }}
          className="sticky top-56 z-10 pt-8"
        />
        {renderTab()}
      </main>
    </>
  );
};

export default Reviews;
