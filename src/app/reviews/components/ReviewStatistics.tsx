import ThumbsupIcon from '../icons/thumbsup.svg';
import ReviewIcon from '../icons/review.svg';
import HeartIcon from '../icons/heart.svg';
import { useGetReviewStatistics } from '@/services/review.service';

const ReviewStatistics = () => {
  const { data: reviewStatistics } = useGetReviewStatistics();
  const averageRating = reviewStatistics?.[0]?.averageRating;
  const reviewCount = reviewStatistics?.[0]?.cumulativeReviewCount;
  const recommendationScore = reviewStatistics?.[0]?.recommendationScore;

  if (!reviewStatistics) return <div className="h-[165px]" />;
  return (
    <section className="flex flex-col gap-12 px-16 py-32">
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-orange-50">
          <ThumbsupIcon viewBox="0 0 19 22" className="h-19 w-19" />
        </div>
        <p className="text-16 font-600 leading-[160%] text-basic-grey-600">
          <span className="text-basic-black">{averageRating}/5.0</span> 별점을
          받았어요
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-blue-100">
          <ReviewIcon className="h-[18px] w-[21px]" viewBox="0 0 21 21" />
        </div>
        <p className="text-16 font-600 leading-[160%] text-basic-grey-600">
          <span className="text-basic-black">{reviewCount}</span>
          개의 후기가 모였어요
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-pink-50">
          <HeartIcon className="h-[18px] w-[18.5px]" viewBox="0 0 20 20" />
        </div>
        <p className="text-16 font-600 leading-[160%] text-basic-grey-600">
          <span className="text-basic-black">{recommendationScore}%</span>의
          사용자가 추천해요
        </p>
      </div>
    </section>
  );
};

export default ReviewStatistics;
