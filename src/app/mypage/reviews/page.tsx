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

// import DeferredSuspense from '@/components/loading/DeferredSuspense';
// import Loading from '@/components/loading/Loading';
// import Link from 'next/link';
// import ReviewIcon from 'public/icons/review.svg';
// import DetailedReview from '@/app/reviews/components/DetailedReview';
// import { useGetUserReviews } from '@/services/review.service';
// import Header from '@/components/header/Header';

// const Reviews = () => {
//   const { data: reviews, isFetching } = useGetUserReviews();
//   return (
//     <>
//       <Header />
//       <DeferredSuspense fallback={<Loading />} isLoading={isFetching}>
//         {reviews && (
//           <main className="px-16 pb-16">
//             <div className="py-8 text-14 font-400 text-basic-grey-500">
//               후기 ({reviews.length})
//             </div>
//             <ul className="flex flex-col gap-16">
//               {reviews.length === 0 ? (
//                 <NoReview />
//               ) : (
//                 reviews.map((review) => (
//                   <DetailedReview
//                     key={review.reviewId}
//                     review={review}
//                     showCreatedAt
//                   />
//                 ))
//               )}
//             </ul>
//           </main>
//         )}
//       </DeferredSuspense>
//     </>
//   );
// };

// export default Reviews;

// const NoReview = () => {
//   return (
//     <div className="flex w-full flex-col items-center gap-4 py-44">
//       <ReviewIcon />
//       <span className="text-16 font-400 text-basic-grey-300">
//         작성한 후기가 없어요
//       </span>
//       <Link
//         href="/mypage/shuttle?type=past"
//         className="text-14 font-500 text-basic-grey-600 underline underline-offset-[3px]"
//       >
//         지난 콘서트 보러가기
//       </Link>
//     </div>
//   );
// };
