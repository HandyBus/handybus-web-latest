'use client';

import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import CancelBottomSheet from '../CancelBottomSheet';
import { ReservationsViewEntity } from '@/types/reservation.type';
const EmptyView = dynamic(() => import('../EmptyView'));

const CurrentTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'CURRENT',
  });

  const router = useRouter();
  const handleReservationDetailClick = (reservationId: string) => {
    router.push(`/mypage/shuttle/${reservationId}`);
  };

  const [reservation, setReservation] = useState<ReservationsViewEntity | null>(
    null,
  );

  const handleReservationCancelClick = (
    reservation: ReservationsViewEntity | null,
  ) => {
    if (!reservation) {
      console.error('예약이 존재하지 않습니다.');
      return;
    }
    setReservation(reservation);
    openBottomSheet();
  };

  const {
    bottomSheetRef,
    contentRef,
    openBottomSheet,
    closeBottomSheet,
    isOpen,
  } = useBottomSheet({
    onClose: () => {
      setReservation(null);
    },
  });

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {reservations &&
        (reservations.length === 0 ? (
          <EmptyView />
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                reservation={reservation}
                {...(reservation.reservationStatus === 'CANCEL'
                  ? {
                      buttonText: '취소 상세 보기',
                      onButtonClick: () =>
                        handleReservationDetailClick(reservation.reservationId),
                    }
                  : {
                      buttonText: '예약 취소',
                      onButtonClick: () =>
                        handleReservationCancelClick(reservation),
                      subButtonText: '예약 상세',
                      onSubButtonClick: () =>
                        handleReservationDetailClick(reservation.reservationId),
                    })}
              />
            ))}
            <CancelBottomSheet
              bottomSheetRef={bottomSheetRef}
              contentRef={contentRef}
              reservation={reservation}
              isOpen={isOpen}
              closeBottomSheet={closeBottomSheet}
            />
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default CurrentTab;
