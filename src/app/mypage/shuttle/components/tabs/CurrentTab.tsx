import { ReservationType } from '@/types/client.types';
import ShuttleCard, { MOCK_SHUTTLE_DATA } from '../ShuttleCard';

const CurrentTab = () => {
  return (
    <ul>
      <ShuttleCard
        id={1}
        data={MOCK_SHUTTLE_DATA}
        subButtonText="예약 상세보기"
        subButtonHref="/mypage/shuttle/1"
      />
      <ShuttleCard
        id={1}
        data={MOCK_SHUTTLE_DATA}
        buttonText="후기 작성하기"
        buttonHref="/mypage/reviews/write"
        subButtonText="예약 상세보기"
        subButtonHref="/mypage/shuttle/1/"
      />
    </ul>
  );
};

export default CurrentTab;

export const MOCK_RESERVATION_DATA: ReservationType = {
  id: 0,
  shuttle: {
    id: 0,
    name: 'string',
    date: 'string',
    image: 'string',
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
        createdAt: 'string',
        updatedAt: 'string',
      },
    ],
    createdAt: 'string',
  },
  reservationStatus: 'NOT_PAYMENT',
  cancelStatus: 'NONE',
  handyStatus: 'NOT_SUPPORTED',
  payment: {
    id: 0,
    principalAmount: 0,
    paymentAmount: 0,
    discountAmount: 0,
  },
};
