'use client';

import AppBar from '@/components/app-bar/AppBar';
import ReservationCard from '../components/ReservationCard';
import { ReservationType } from '@/types/client.types';
import ReservationInfoSection from './components/sections/ReservationInfoSection';
import HandySection from './components/sections/HandySection';
import ShuttleInfoSection from './components/sections/ShuttleInfoSection';
// import PaymentInfoSection from './components/sections/PaymentInfoSection';
import RefundSection from './components/sections/RefundSection';
import TermsSection from './components/sections/TermsSection';
import RefundInfoSection from './components/sections/RefundInfoSection';
import RefundGuideSection from './components/sections/RefundGuideSection';
import RouteSection from './components/sections/RouteSection';
import { useGetUserDashboard } from '@/services/users';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading } = useGetUserDashboard();
  const reservation = data?.reservations.current.find(
    (reservation) => reservation.id === Number(id),
  );
  const isShuttleAssigned = !(
    reservation?.shuttleBus === undefined && reservation?.shuttleBus === null
  );
  const isHandy = reservation?.handyStatus === 'ACCEPTED';
  const isCanceled = reservation?.cancelStatus === 'CANCEL_COMPLETE';

  if (isLoading) {
    return <div className="h-[100dvh]" />;
  }

  if (!reservation) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <main className="grow">
        <ReservationCard reservation={reservation} />
        {!isShuttleAssigned && (
          <section className="m-16 rounded-[10px] bg-primary-50 p-16 text-14 font-400 text-grey-800">
            <p>
              현재 셔틀 정보, 기사님 정보, 핸디 정보 등을 결정하고 있어요.
              확정되면 알림톡을 전송해드릴게요.
            </p>
          </section>
        )}
        {!isCanceled ? (
          <>
            {isHandy && (
              <HandySection id={id} name={reservation.passengers?.[0].name} />
            )}
            {reservation.shuttleBus && (
              <ShuttleInfoSection
                name={reservation.shuttleBus.name}
                busNumber={reservation.shuttleBus.number}
                openChatLink={reservation.shuttleBus.openChatLink}
              />
            )}
            <ReservationInfoSection
              trip={reservation.type}
              shuttle={reservation.shuttle}
              passengers={reservation.passengers}
              handyStatus={reservation.handyStatus}
              isShuttleAssigned={isShuttleAssigned}
            />
            <RouteSection />
            {/* TODO: 결제 연동된 이후에 주석 해제 */}
            {/* <PaymentInfoSection
              price={reservation.payment.principalAmount}
              discount={reservation.payment.discountAmount}
              finalPrice={reservation.payment.paymentAmount}
              passengerCount={reservation.passengers.length}
            /> */}
            <RefundSection id={id} />
            <TermsSection />
          </>
        ) : (
          <>
            <RefundInfoSection
              requestedDate={reservation.payment.refundRequests[0].createdAt}
              resolvedDate={reservation.payment.refundRequests[0].refundAt}
              price={reservation.payment.paymentAmount}
              refundPrice={reservation.payment.refundRequests[0].refundAmount}
            />
            <ReservationInfoSection
              isExpandable
              trip={reservation.type}
              shuttle={reservation.shuttle}
              passengers={reservation.passengers}
              handyStatus={reservation.handyStatus}
              isShuttleAssigned={isShuttleAssigned}
            />
            <RefundGuideSection />
          </>
        )}
      </main>
    </>
  );
};

export default ShuttleDetail;

export const MOCK_RESERVATION_DATA: ReservationType = {
  id: 0,
  shuttle: {
    id: 0,
    name: 'string',
    date: 'string',
    image:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg',
    status: 'OPEN',
    destination: {
      name: 'string',
      longitude: 0,
      latitude: 0,
    },
    route: {
      name: 'string',
      status: 'OPEN',
      hubs: {
        pickup: [
          {
            name: 'string',
            sequence: 0,
            arrivalTime: 'string',
            selected: true,
          },
        ],
        dropoff: [
          {
            name: 'string',
            sequence: 0,
            arrivalTime: 'string',
            selected: true,
          },
        ],
      },
    },
  },
  hasReview: true,
  review: {
    id: 0,
    rating: 0,
    content: 'string',
    images: [
      {
        imageUrl: 'https://example.com/image.jpg',
        status: 'ACTIVE',
        createdAt: 'string',
        updatedAt: 'string',
      },
    ],
    createdAt: 'string',
  },
  type: 'TO_DESTINATION',
  reservationStatus: 'NOT_PAYMENT',
  cancelStatus: 'CANCEL_COMPLETE',
  handyStatus: 'ACCEPTED',
  passengers: [
    {
      name: 'string',
      phoneNumber: 'string',
    },
  ],
  payment: {
    id: 0,
    principalAmount: 0,
    paymentAmount: 0,
    discountAmount: 0,
    refundableAmount: 0,
    refundRequests: [
      {
        ID: 1,
        paymentID: '1',
        principalAmount: 10000,
        previousRefundableAmount: 10000,
        refundAmount: 10000,
        refundReason: '환불 사유',
        afterRefundableAmount: 10000,
        refundAt: '2024-01-01 00:00:00',
        failedReason: '환불 실패 사유',
        status: 'REQUESTED',
        createdAt: '2024-01-01 00:00:00',
      },
    ],
  },
  shuttleBus: {
    shuttleBusID: 1,
    shuttleRouteID: 100,
    handyUserID: 100,
    type: 'SEATER_12',
    name: '스타렉스',
    number: '12가 3456',
    phoneNumber: '010-1234-5678',
    openChatLink: 'https://openchat.example.com',
    capacity: 12,
  },
  createdAt: 'string',
};
