import Link from 'next/link';
import ReviewIcon from 'public/icons/review.svg';

const EmptyReview = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-44">
      <ReviewIcon />
      <span className="text-16 font-400 text-basic-grey-300">
        작성한 후기가 없어요
      </span>
      <Link
        href="/mypage/shuttle?type=reservation"
        className="text-14 font-500 text-basic-grey-600 underline underline-offset-[3px]"
      >
        지난 콘서트 보러가기
      </Link>
    </div>
  );
};

export default EmptyReview;
