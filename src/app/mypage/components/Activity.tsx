'use client';

import { useGetUserAlertRequestsWithPagination } from '@/services/alertRequest.service';
import { useGetUserReservations } from '@/services/reservation.service';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import Link from 'next/link';
import { useMemo } from 'react';
import { customTwMerge } from 'tailwind.config';
import useAppRouter, { createAppRedirectPath } from '@/hooks/useAppRouter';

const Activity = () => {
  const { isApp } = useAppRouter();

  const reservations = useGetUserReservations({
    reservationStatus: 'COMPLETE_PAYMENT',
    monthsAgo: 3,
  });
  const seatAlarms = useGetUserAlertRequestsWithPagination();
  const writableReviewCount = useMemo(() => {
    if (!reservations.data) {
      return null;
    }

    const count = reservations.data.filter((reservation) => {
      const isReviewAvailable = !!reservation.reviewId;
      if (isReviewAvailable) {
        return false;
      }
      const isReviewWritingPeriod = checkIsReviewWritingPeriod(reservation);
      if (!isReviewWritingPeriod) {
        return false;
      }
      return true;
    }).length;

    return count;
  }, [reservations.data]);

  const writableSeatAlarmCount = useMemo(() => {
    if (!seatAlarms.data) {
      return null;
    }
    return seatAlarms.data.pages.flatMap(
      (page) => page.shuttleRouteAlertRequests,
    ).length;
  }, [seatAlarms.data]);

  return (
    <section className="mx-16 mb-24 mt-12 flex gap-12">
      <Link
        href={createAppRedirectPath('/mypage/reviews', { isApp })}
        className="relative flex h-[74px] flex-1 rounded-8 border border-basic-grey-200 px-16 py-12 active:bg-basic-grey-50"
      >
        <h3 className="text-16 font-600">작성 가능 후기</h3>
        <div
          className={customTwMerge(
            'absolute bottom-8 right-16 h-[30px] text-22 font-600',
            writableReviewCount === 0 && 'text-basic-grey-400',
          )}
        >
          {writableReviewCount}
        </div>
      </Link>
      <Link
        href={createAppRedirectPath('/mypage/alert-requests', { isApp })}
        className="relative flex h-[74px] flex-1 rounded-8 border border-basic-grey-200 px-16 py-12 active:bg-basic-grey-50"
      >
        <h3 className="text-16 font-600">빈자리 알림</h3>
        <div
          className={customTwMerge(
            'absolute bottom-8 right-16 h-[30px] text-22 font-600',
            writableSeatAlarmCount === 0 && 'text-basic-grey-400',
          )}
        >
          {writableSeatAlarmCount}
        </div>
      </Link>
    </section>
  );
};

export default Activity;
