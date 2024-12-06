import { MOCK_SHUTTLE_DATA } from '../ShuttleCard';

import ShuttleCard from '../ShuttleCard';

const CurrentTab = () => {
  return (
    <ul>
      <ShuttleCard
        id={1}
        data={MOCK_SHUTTLE_DATA}
        subButtonText="예약 상세보기"
        subButtonHref="/mypage/shuttle/1"
      />
      <ShuttleCard
        id={1}
        data={MOCK_SHUTTLE_DATA}
        buttonText="후기 작성하기"
        buttonHref="/mypage/reviews/write"
        subButtonText="예약 상세보기"
        subButtonHref="/mypage/shuttle/1/"
      />
    </ul>
  );
};

export default CurrentTab;
