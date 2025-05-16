import Rating from '@/components/rating/Rating';
const RatingInput = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-18 font-600 leading-[160%]">
        전반적인 만족도를 알려주세요
      </h2>
      <div className="flex items-center gap-8">
        <Rating size="large" onChange={setRating} value={rating} />
        <RatingText rating={rating} />
      </div>
    </div>
  );
};

const RatingText = ({ rating }: { rating: number }) => {
  return (
    <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
      {RATING_DESCRIPTION_MAP[rating]}
    </p>
  );
};

const RATING_DESCRIPTION_LIST = [
  '실망스러웠어요..',
  '조금 아쉬웠어요',
  '그저 그랬어요',
  '잘 이용했어요!',
  '핸디버스 정말 최고에요!!',
] as const;

type RatingDescriptionText = (typeof RATING_DESCRIPTION_LIST)[number];

const RATING_DESCRIPTION_MAP: Record<number, RatingDescriptionText> =
  RATING_DESCRIPTION_LIST.reduce(
    (acc, text, idx) => {
      acc[idx + 1] = text;
      return acc;
    },
    {} as Record<number, RatingDescriptionText>,
  );

export default RatingInput;
