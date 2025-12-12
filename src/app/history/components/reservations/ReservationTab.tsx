'use client';

import ReservationCard from './ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
import usePeriodFilter from '../period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../period-filter-bar/PeriodFilterBar';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import { useMemo } from 'react';
import ArrowRightIcon from '../../icons/arrow-right-grey.svg';
import { useGetUserAlertRequestsWithPagination } from '@/services/alertRequest.service';
import Link from 'next/link';
import { customTwMerge } from 'tailwind.config';
const EmptyView = dynamic(() => import('./EmptyView'));
import InvitePaybackEventImage from './images/invite-payback-banner.png';
import Image, { StaticImageData } from 'next/image';

const INVITE_PAYBACK_EVENT_URL = 'https://www.handybus.co.kr/announcements';

const ReservationTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: reservations, isLoading: isReservationsLoading } =
    useGetUserReservations({
      monthsAgo: periodFilter === 'ALL' ? undefined : periodFilter,
    });
  const { data: alertRequests, isLoading: isAlertRequestsLoading } =
    useGetUserAlertRequestsWithPagination();

  const isLoading = isReservationsLoading || isAlertRequestsLoading;

  const isReviewWritableReservationsAvailable = useMemo(() => {
    return reservations
      ? reservations.some((reservation) => {
          const { isReviewWritingPeriod } =
            checkIsReviewWritingPeriod(reservation);
          const isReviewNotWritten = reservation.reviewId === null;
          return isReviewWritingPeriod && isReviewNotWritten;
        })
      : false;
  }, [reservations]);
  const isAlertRequestAvailable = useMemo(() => {
    return alertRequests
      ? alertRequests.pages.flatMap((page) => page.shuttleRouteAlertRequests)
          .length > 0
      : false;
  }, [alertRequests]);

  return (
    <>
      <PeriodFilterBar
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />
      <PromotionBanner
        image={InvitePaybackEventImage}
        href={INVITE_PAYBACK_EVENT_URL}
      />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservations && alertRequests && (
          <>
            <section
              className={customTwMerge(
                'flex w-full flex-col gap-8 px-16 pb-16',
                !isAlertRequestAvailable &&
                  !isReviewWritableReservationsAvailable &&
                  'hidden',
              )}
            >
              {isAlertRequestAvailable && (
                <Link
                  href="/mypage/alert-requests"
                  className="flex h-48 w-full items-center justify-between rounded-8 border border-basic-blue-200 bg-basic-blue-100 px-16 py-12"
                >
                  <span className="text-14 font-600 text-basic-blue-400">
                    빈자리 알림을 신청한 행사가 있어요.
                  </span>
                  <ArrowRightIcon />
                </Link>
              )}
              {isReviewWritableReservationsAvailable && (
                <Link
                  href="/mypage/reviews"
                  className="flex h-48 w-full items-center justify-between rounded-8 border border-basic-blue-200 bg-basic-blue-100 px-16 py-12"
                >
                  <span className="text-14 font-600 text-basic-blue-400">
                    작성할 수 있는 후기가 있어요.
                  </span>
                  <ArrowRightIcon />
                </Link>
              )}
            </section>
            <>
              {reservations.length === 0 ? (
                <EmptyView />
              ) : (
                <ul className="flex flex-col gap-16 px-16 pb-48">
                  {reservations.map((reservation) => {
                    const event = reservation.shuttleRoute.event;
                    const dailyEvent = event.dailyEvents.find(
                      (dailyEvent) =>
                        dailyEvent.dailyEventId ===
                        reservation.shuttleRoute.dailyEventId,
                    );
                    if (!event || !dailyEvent) {
                      return null;
                    }
                    return (
                      <ReservationCard
                        key={reservation.reservationId}
                        reservation={reservation}
                        event={event}
                        dailyEvent={dailyEvent}
                      />
                    );
                  })}
                </ul>
              )}
            </>
          </>
        )}
      </DeferredSuspense>
    </>
  );
};

export default ReservationTab;

interface PromotionBannerProps {
  image: StaticImageData;
  href: string;
}
const PromotionBanner = ({ image, href }: PromotionBannerProps) => {
  return (
    <section className="px-16 pb-16">
      <Link
        href={href}
        className="relative block aspect-[344/100] w-full overflow-hidden rounded-8"
      >
        <Image
          src={image}
          alt="promotion banner"
          fill
          className="object-cover"
        />
      </Link>
    </section>
  );
};
