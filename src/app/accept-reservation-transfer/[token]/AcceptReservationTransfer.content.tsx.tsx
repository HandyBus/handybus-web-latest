'use client';

import Header from '@/components/header/Header';
import ShuttleInfoSection from './components/ShuttleInfoSection';
import NoticeSection from './components/NoticeSection';
import SubmitSection from './components/SubmitSection';
import SenderSection from './components/SenderSection';
import { useGetReservationTransferRequestWithToken } from '@/services/reservationTransferRequest.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import TitleSection from './components/TitleSection';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useGetUser } from '@/services/user.service';
import { UsersViewEntity } from '@/types/user.type';
import { formatPhoneNumber } from '@/utils/common.util';
import { useFlow } from '@/stacks';

interface Props {
  token: string;
}

const AcceptReservationTransfer = ({ token }: Props) => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const {
    data: reservationTransferRequestDetail,
    isLoading: isReservationTransferRequestLoading,
  } = useGetReservationTransferRequestWithToken(token);

  const flow = useFlow();
  if (
    !isUserLoading &&
    !isReservationTransferRequestLoading &&
    !user &&
    !reservationTransferRequestDetail
  ) {
    flow.replace('Home', {}, { animate: false });
    return;
  }

  const isLoading = isUserLoading || isReservationTransferRequestLoading;

  return (
    <>
      <Header pageName="탑승권 선물" />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {user && reservationTransferRequestDetail && (
          <Content
            user={user}
            reservation={reservationTransferRequestDetail.reservation}
            reservationTransferRequest={
              reservationTransferRequestDetail.reservationTransferRequest
            }
            token={token}
          />
        )}
      </DeferredSuspense>
    </>
  );
};

export default AcceptReservationTransfer;

interface ContentProps {
  user: UsersViewEntity;
  reservation: ReservationsViewEntity;
  reservationTransferRequest: ReservationTransferRequestsEntity;
  token: string;
}

const Content = ({
  user,
  reservation,
  reservationTransferRequest,
  token,
}: ContentProps) => {
  const flow = useFlow();

  const userPhoneNumber = user.phoneNumber;
  const receiverPhoneNumber = reservationTransferRequest.receiverPhoneNumber;
  if (userPhoneNumber !== receiverPhoneNumber) {
    const formattedReceiverPhoneNumber = formatPhoneNumber(
      receiverPhoneNumber,
      true,
    );
    flow.replace(
      'AcceptReservationTransferFail',
      { token, receiverPhoneNumber: formattedReceiverPhoneNumber },
      { animate: false },
    );
    return;
  }

  const isAccepted = reservationTransferRequest.status === 'ACCEPTED';
  if (isAccepted) {
    flow.replace(
      'AcceptReservationTransferSuccess',
      { status: 'already-accepted' },
      { animate: false },
    );
    return;
  }

  const isPending = reservationTransferRequest.status === 'PENDING';

  return (
    <main className="flex grow flex-col">
      <TitleSection
        reservation={reservation}
        reservationTransferRequest={reservationTransferRequest}
      />
      <ShuttleInfoSection reservation={reservation} />
      <SenderSection reservation={reservation} />
      <NoticeSection />
      {isPending && <SubmitSection token={token} />}
    </main>
  );
};
