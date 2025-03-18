import Link from 'next/link';
import ReservationEmpty from '../icons/reservation-empty.svg';

const Empty = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-16 py-56">
      <ReservationEmpty />
      <span className="text-center text-16 font-400 text-grey-300">
        셔틀 예약이 곧 진행될 예정이에요.
        <br />
        예약이 시작되면 알림톡을 보내드려요!
      </span>
      <Link href="/login">
        <span className="text-14 font-500 text-grey-600 underline">
          가입하고 알림받기
        </span>
      </Link>
    </div>
  );
};

export default Empty;
