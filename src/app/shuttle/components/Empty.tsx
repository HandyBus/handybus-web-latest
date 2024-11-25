import Link from 'next/link';
import ReservationEmpty from '../icons/reservation-empty.svg';

const Empty = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-16 py-56">
      <ReservationEmpty />
      <span className="text-16 font-400 text-grey-300">
        예약 모집 중인 셔틀이 없어요
      </span>
      <Link href="/TODO">
        <span className="text-14 font-500 text-grey-600-sub underline">
          수요 신청하러 가기
        </span>
      </Link>
    </div>
  );
};

export default Empty;
