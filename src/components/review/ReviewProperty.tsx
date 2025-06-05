import { ID_TO_REGION } from '@/constants/regions';
import { BIG_REGIONS_TO_SHORT_NAME } from '@/constants/regions';
import { ReviewsViewEntity } from '@/types/review.type';

interface Props {
  review: ReviewsViewEntity;
}

const ReviewProperty = ({ review }: Props) => {
  const regionId =
    review.toDestinationRegionId ?? review.fromDestinationRegionId;
  const regionName = regionId
    ? BIG_REGIONS_TO_SHORT_NAME[ID_TO_REGION[regionId].bigRegion]
    : undefined;
  const serviceRating =
    EXPERIENCE_SATISFACTION_TEXT_LIST[review.serviceRating - 1];
  const rideRating = EXPERIENCE_SATISFACTION_TEXT_LIST[review.rideRating - 1];

  return (
    <div className="flex gap-[6px] ">
      {regionName && <PassengerRegion regionName={regionName} />}
      {regionName && <TextDivider />}
      <ExperienceSatisfaction type="서비스" text={serviceRating} />
      <TextDivider />
      <ExperienceSatisfaction type="탑승" text={rideRating} />
    </div>
  );
};

export default ReviewProperty;

const PassengerRegion = ({ regionName }: { regionName: string }) => {
  return (
    <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
      {regionName} 탑승객
    </p>
  );
};

interface ExperienceSatisfactionProps {
  type: ExperienceSatisfactionType;
  text: ExperienceSatisfactionText;
}

const ExperienceSatisfaction = ({
  type,
  text,
}: ExperienceSatisfactionProps) => {
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

type ExperienceSatisfactionType = '서비스' | '탑승';
type ExperienceSatisfactionText =
  | '매우 불만족'
  | '불만족'
  | '보통'
  | '만족'
  | '매우 만족';

const EXPERIENCE_SATISFACTION_TEXT_LIST: ExperienceSatisfactionText[] = [
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
