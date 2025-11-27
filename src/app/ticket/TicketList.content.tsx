'use client';

import { useGetUserReservations } from '@/services/reservation.service';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import TicketList from './components/TicketList';
import NavBar from '@/components/nav-bar/NavBar';
import NoTicketIcon from './icons/no-ticket.svg';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import Header from '@/components/header/Header';

const TicketListPage = () => {
  const { data, isLoading, isError } = useGetUserReservations({
    reservationStatus: 'COMPLETE_PAYMENT',
    eventProgressStatus: 'CURRENT',
  });
  const withoutHandyPartyReservations = data?.filter(
    (reservation) => !checkIsHandyParty(reservation.shuttleRoute),
  );

  if (isError) throw new Error('Failed to fetch tickets');
  return (
    <>
      <Header pageName="모든 탑승권" />
      <main className="flex flex-1 flex-col">
        <DeferredSuspense
          fallback={<Loading style="grow" />}
          isLoading={isLoading}
        >
          {withoutHandyPartyReservations &&
          withoutHandyPartyReservations.length > 0 ? (
            <TicketList reservations={withoutHandyPartyReservations} />
          ) : (
            <EmptyTicket />
          )}
        </DeferredSuspense>
      </main>
      <NavBar />
    </>
  );
};

export default TicketListPage;

const EmptyTicket = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-24">
      <NoTicketIcon />
      <p className="text-14 font-600 leading-[160%] text-basic-grey-500">
        탑승권이 없어요
      </p>
    </div>
  );
};
