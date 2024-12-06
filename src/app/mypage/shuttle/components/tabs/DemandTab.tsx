import { ReactNode } from 'react';
import ShuttleCard from '../ShuttleCard';
import { MOCK_SHUTTLE_DATA } from '../ShuttleCard';
import SmallBusIcon from 'public/icons/bus-small.svg';

const DemandTab = () => {
  return (
    <ul>
      <ReservationOngoingWrapper>
        <ShuttleCard
          id={1}
          data={MOCK_SHUTTLE_DATA}
          buttonText="현재 예약이 진행되고 있는 셔틀이 있어요!"
          buttonHref="/shuttle-detail"
        />
      </ReservationOngoingWrapper>
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

export default DemandTab;

interface ReservationOngoingWrapperProps {
  children: ReactNode;
}

const ReservationOngoingWrapper = ({
  children,
}: ReservationOngoingWrapperProps) => {
  return (
    <>
      <div className="line-clamp-1 flex h-40 w-full items-center gap-8 bg-grey-50 px-24">
        <SmallBusIcon />
        <span className="text-12 font-500 text-grey-600">
          수요신청 하신 셔틀 중{' '}
          <span className="font-600 text-grey-800">1개</span>의 셔틀이 예약 진행
          중입니다.
        </span>
      </div>
      {children}
      <div className="mt-12 h-8 w-full bg-grey-50" />
    </>
  );
};
