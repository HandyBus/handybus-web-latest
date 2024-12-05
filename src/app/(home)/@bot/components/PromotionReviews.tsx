import Rating from '@/components/rating/Rating';
import Article from '@/components/article/Article';

// TODO use real api after implemenation
const getFirstFullScoreReview = () => {
  return {
    rating: 5,
    content:
      '요번에도 세븐틴 캐럿랜드 막콘만 가게되어 차대절로 편하게 다녀왔습니다~~!! 버스안에 충전기도 구비되어 있어서 아주 편했어요~!! 다음에도 하루만 가게 된다면 핸디버스 차대절로 신청하려구요😆 다음번에도 핸디버스와 함께할거에요💚',
  };
};

const PromotionReview = async () => {
  const review = await getFirstFullScoreReview();

  return (
    <Article richTitle="핸디버스의 생생한 후기" showMore="/help/reviews">
      <div className="mx-16 mt-8 flex flex-col gap-[10px] rounded-[16px] bg-grey-50 p-16">
        <Rating size="medium" value={review.rating} />
        <p className="line-clamp-2 overflow-hidden text-14 font-500 text-grey-600-sub">
          {review.content}
        </p>
      </div>
    </Article>
  );
};

export default PromotionReview;
