'use client';

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
    <main className="relative grow bg-basic-grey-50">
      <Tabs
        items={[
          { label: '작성 가능한 후기', value: 'writable-reviews' },
          { label: '작성한 후기', value: 'written-reviews' },
        ]}
        selected={currentTab}
        onSelect={(value) => {
          router.replace(`/mypage/reviews?type=${value}`);
        }}
        className="top-[var(--app-header-offset)]"
      />
      {renderTab()}
    </main>
  );
};

export default Reviews;
