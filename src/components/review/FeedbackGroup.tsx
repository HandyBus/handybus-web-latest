export const FeedbackGroup = () => {
  return (
    <div className="flex gap-[6px] ">
      <PassengerRegion />
      <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
      <FeedbackCard type="서비스" text="매우 만족" />
      <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
      <FeedbackCard type="탑승" text="매우 만족" />
    </div>
  );
};

const PassengerRegion = () => {
  return (
    <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
      경남 탑승객
    </p>
  );
};

const FeedbackCard = ({
  type,
  text,
}: {
  type: FeedbackType;
  text: FeedbackText;
}) => {
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
