import { ID_TO_REGION } from '@/constants/regions';
import { BIG_REGIONS_TO_SHORT_NAME } from '@/constants/regions';
import { ReviewsViewEntity } from '@/types/review.type';

interface Props {
  review: ReviewsViewEntity;
}

const FeedbackGroup = ({ review }: Props) => {
  const regionId =
    review.toDestinationRegionId ?? review.fromDestinationRegionId;
  const regionName = regionId
    ? BIG_REGIONS_TO_SHORT_NAME[ID_TO_REGION[regionId].bigRegion]
    : undefined;
  const serviceRating = FEEDBACK_TEXT_LIST[review.serviceRating - 1];
  const rideRating = FEEDBACK_TEXT_LIST[review.rideRating - 1];

  return (
    <div className="flex gap-[6px] ">
      {regionName && <PassengerRegion regionName={regionName} />}
      {regionName && <TextDivider />}
      <FeedbackCard type="서비스" text={serviceRating} />
      <TextDivider />
      <FeedbackCard type="탑승" text={rideRating} />
    </div>
  );
};

export default FeedbackGroup;

const PassengerRegion = ({ regionName }: { regionName: string }) => {
  return (
    <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
      {regionName} 탑승객
    </p>
  );
};

interface FeedbackCardProps {
  type: FeedbackType;
  text: FeedbackText;
}

const FeedbackCard = ({ type, text }: FeedbackCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
        {type}
      </p>
      <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
        {text}
      </p>
    </div>
  );
};

type FeedbackType = '서비스' | '탑승';
type FeedbackText = '매우 불만족' | '불만족' | '보통' | '만족' | '매우 만족';

const FEEDBACK_TEXT_LIST: FeedbackText[] = [
  '매우 불만족',
  '불만족',
  '보통',
  '만족',
  '매우 만족',
];

const TextDivider = () => {
  return (
    <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
  );
};
