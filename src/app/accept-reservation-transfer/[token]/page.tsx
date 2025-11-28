'use client';

import Header from '@/components/header/Header';
import ShuttleInfoSection from './components/ShuttleInfoSection';
import NoticeSection from './components/NoticeSection';
import SubmitSection from './components/SubmitSection';
import SenderSection from './components/SenderSection';
import { useGetReservationTransferRequestWithToken } from '@/services/reservationTransferRequest.service';
import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import TitleSection from './components/TitleSection';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useGetUser } from '@/services/user.service';
import { UsersViewEntity } from '@/types/user.type';
import { formatPhoneNumber } from '@/utils/common.util';

interface Props {
  params: {
    token: string;
  };
}

const Page = ({ params }: Props) => {
  const { token } = params;

  const { data: user, isLoading: isUserLoading } = useGetUser();
  const {
    data: reservationTransferRequestDetail,
    isLoading: isReservationTransferRequestLoading,
  } = useGetReservationTransferRequestWithToken(token);

  const router = useRouter();
  if (
    !isUserLoading &&
    !isReservationTransferRequestLoading &&
    !user &&
    !reservationTransferRequestDetail
  ) {
    router.replace('/');
    return;
  }

  const isLoading = isUserLoading || isReservationTransferRequestLoading;

  return (
    <>
      <Header />
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

export default Page;

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
  const router = useRouter();

  const userPhoneNumber = user.phoneNumber;
  const receiverPhoneNumber = reservationTransferRequest.receiverPhoneNumber;
  if (userPhoneNumber !== receiverPhoneNumber) {
    const formattedReceiverPhoneNumber = formatPhoneNumber(
      receiverPhoneNumber,
      true,
    );
    router.replace(
      `/accept-reservation-transfer/${token}/fail?receiverPhoneNumber=${formattedReceiverPhoneNumber}`,
    );
    return;
  }

  const isAccepted = reservationTransferRequest.status === 'ACCEPTED';
  if (isAccepted) {
    router.replace(
      `/accept-reservation-transfer/${token}/success?status=already-accepted`,
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
