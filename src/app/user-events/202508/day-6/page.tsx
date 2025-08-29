'use client';

import Button from '@/components/buttons/button/Button';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DocIcon from './icons/doc-icon.svg';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { LOGIN_REDIRECT_URL_KEY } from '@/hooks/useAuthRouter';

const DAY_6_EVENT_ID = process.env.NEXT_PUBLIC_DAY_6_EVENT_ID;
console.log(DAY_6_EVENT_ID);
const Day6 = () => {
  const { push } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
  }, [push]);

  if (isLoggedIn === false) {
    const redirectUrl = encodeURIComponent('/user-events/202508/day-6');
    push(`/login?${LOGIN_REDIRECT_URL_KEY}=${redirectUrl}`);
  }

  if (isLoggedIn) return <Day6Content />;
  return null;
};

const Day6Content = () => {
  const { push } = useRouter();
  const {
    data: reservations,
    isLoading,
    isError,
  } = useGetUserReservations({
    monthsAgo: 1,
    reservationStatus: 'COMPLETE_PAYMENT',
    eventId: DAY_6_EVENT_ID,
    eventProgressStatus: 'CURRENT',
  });

  // 단순히 데이식스행사와 당일에 해당하는 노선에 해당하는 예약만을 추출함. 당일 여러개의 예약이라던지 등의 예외케이스를 고려하지 않음
  const reservationWithTargetEvent = reservations?.find((reservation) => {
    const dailyEventId = reservation.shuttleRoute.dailyEventId;
    const eventId = reservation.shuttleRoute.event.eventId;
    const isTargetEvent = eventId === DAY_6_EVENT_ID;
    const isTargetDailyEvent = dayjs(
      reservation.shuttleRoute.event.dailyEvents.find(
        (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
      )?.date,
    ).isSame(dayjs(), 'day');
    return isTargetEvent && isTargetDailyEvent;
  });
  const reservationId = reservationWithTargetEvent?.reservationId;

  useEffect(() => {
    if (reservationId) {
      push(`/mypage/reviews/write/${reservationId}`);
    }
  }, [reservationId, push]);

  if (isError) throw new Error('유저 예약 정보를 받아오는데 실패했습니다.');
  if (isLoading || reservationId) return <Loading style="screen" />;
  if (!reservationId)
    return (
      <div className="fixed inset-0 z-[101] mx-auto flex max-w-[500px] flex-col items-center bg-basic-white">
        <section className="mx-48 mt-180 flex flex-col items-center gap-24">
          <div className="flex flex-col gap-4">
            <h3 className="mb-4 break-keep text-center text-22 font-700 leading-[140%]">
              데이식스 탑승객들을 위한 후기 페이지예요.
            </h3>
            <p className="mb-24 break-keep text-center text-16 font-500 leading-[160%] text-basic-grey-600">
              해당 셔틀을 탑승하지 않아서 후기를 작성할 수 없어요.
            </p>
          </div>
          <DocIcon />
        </section>
        <section className="mt-auto flex w-full flex-col items-center gap-8 p-16">
          <Button variant="primary" size="large" onClick={() => push('/')}>
            홈으로 돌아가기
          </Button>
        </section>
      </div>
    );
};

export default Day6;
