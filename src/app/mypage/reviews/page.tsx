import AppBar from '@/components/app-bar/AppBar';
import Link from 'next/link';
import ReviewIcon from 'public/icons/review.svg';

const Reviews = () => {
  return (
    <>
      <AppBar>작성한 후기 조회</AppBar>
      <main className="px-16 pb-16">
        <div className="py-8 text-14 font-400 text-grey-500">후기 (0)</div>
        <NoReview />
      </main>
    </>
  );
};

export default Reviews;

const NoReview = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-44">
      <ReviewIcon />
      <span className="text-16 font-400 text-grey-300">
        작성한 후기가 없어요
      </span>
      <Link
        href="/"
        className="text-14 font-500 text-grey-600-sub underline underline-offset-[3px]"
      >
        지난 콘서트 보러가기
      </Link>
    </div>
  );
};
