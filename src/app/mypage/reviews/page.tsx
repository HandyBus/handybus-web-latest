'use client';

import Header from '@/components/header/Header';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import WritableReviews from './components/WritableReviews';
import WrittenReviews from './components/WrittenReviews';

type ReviewTabType = 'writable-reviews' | 'written-reviews';

interface Props {
  searchParams: {
    type: ReviewTabType;
  };
}

const Reviews = ({ searchParams }: Props) => {
  const router = useRouter();
  const currentTab: ReviewTabType = searchParams.type || 'writable-reviews';

  const renderTab = () => {
    switch (currentTab) {
      case 'writable-reviews':
        return <WritableReviews />;
      case 'written-reviews':
        return <WrittenReviews />;
    }
  };
  return (
    <main>
      <Header />
      <Tabs
        items={[
          { label: '작성 가능한 후기', value: 'writable-reviews' },
          { label: '작성한 후기', value: 'written-reviews' },
        ]}
        selected={currentTab}
        onSelect={(value) => {
          router.replace(`/mypage/reviews?type=${value}`);
        }}
        className="sticky top-48 z-10 mt-16"
      />
      {renderTab()}
    </main>
  );
};

export default Reviews;
