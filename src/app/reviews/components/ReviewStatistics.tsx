import ThumbsupIcon from '../icons/thumbsup.svg';
import ReviewIcon from '../icons/review.svg';
import HeartIcon from '../icons/heart.svg';
import { useGetReviewStatistics } from '@/services/review.service';

const ReviewStatistics = () => {
  const { data: reviewStatistics } = useGetReviewStatistics();
  const averageRating = reviewStatistics?.[0]?.averageRating ?? 5;
  const reviewCount = reviewStatistics?.[0]?.cumulativeReviewCount ?? 100;
  const recommendationScore = reviewStatistics?.[0]?.recommendationScore ?? 100;

  return (
    <section className="flex flex-col gap-12 px-16 py-32">
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-orange-50">
          <ThumbsupIcon className="h-[19px] w-[19px]" />
        </div>
        <p className="text-16 font-600 leading-[160%] text-basic-grey-600">
          <span className="text-basic-black">{averageRating}/5.0</span> 별점을
          받았어요
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-blue-100">
          <ReviewIcon className="h-[21.5px] w-[21.5px]" />
        </div>
        <p className="text-16 font-600 leading-[160%] text-basic-grey-600">
          <span className="text-basic-black">{reviewCount}</span>
          개의 후기가 모였어요
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-pink-50">
          <HeartIcon className="h-[19.3px] w-[19.3px]" />
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
