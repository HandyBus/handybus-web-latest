'use client';

import Header from '@/components/header/Header';
import PhoneNumberSection from './components/PhoneNumberSection';
import ShuttleInfoSection from './components/ShuttleInfoSection';
import NoticeSection from './components/NoticeSection';
import SubmitSection from './components/SubmitSection';
import { useGetUserReservation } from '@/services/reservation.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useState } from 'react';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const { data: reservationDetail, isLoading } =
    useGetUserReservation(reservationId);
  const reservation = reservationDetail?.reservation;

  const [value, setValue] = useState('');

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservation && (
          <main className="flex grow flex-col">
            <PhoneNumberSection value={value} setValue={setValue} />
            <ShuttleInfoSection reservation={reservation} />
            <NoticeSection />
            <SubmitSection value={value} reservationId={reservationId} />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
