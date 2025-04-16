import FAQReservation1 from '@/data/faq/reservation-1-what-is-demand.mdx';
import FAQReservation2 from '@/data/faq/reservation-2-when-can-i-book.mdx';
import FAQReservation3 from '@/data/faq/reservation-3-how-many-people-needed-for-survey.mdx';
import FAQReservation4 from '@/data/faq/reservation-4-no-desired-stop-in-survey.mdx';
import FAQReservation5 from '@/data/faq/reservation-5-when-is-shuttle-confirmed.mdx';
import FAQReservation6 from '@/data/faq/reservation-6-sold-out-additional-shuttle.mdx';
import FAQReservation7 from '@/data/faq/reservation-7-check-reservation-details.mdx';
import FAQReservation8 from '@/data/faq/reservation-8-change-boarding-location.mdx';
import FAQReservation9 from '@/data/faq/reservation-9-cancel-reservation.mdx';
import FAQBoarding1 from '@/data/faq/boarding-1-does-shuttle-stop-at-rest-area.mdx';
import FAQBoarding2 from '@/data/faq/boarding-2-what-bus-is-used-for-service.mdx';
import FAQBoarding3 from '@/data/faq/boarding-3-how-are-seats-assigned.mdx';
import FAQBoarding4 from '@/data/faq/boarding-4-leave-luggage-on-shuttle.mdx';
import FAQBoarding5 from '@/data/faq/boarding-5-change-one-way-to-round-trip.mdx';
import FAQBoarding6 from '@/data/faq/boarding-6-use-one-way-from-round-trip.mdx';
import FAQEtc1 from '@/data/faq/etc-1-did-not-receive-signup-coupon.mdx';
import FAQEtc2 from '@/data/faq/etc-2-what-is-handy.mdx';

export const FAQ_ITEMS = [
  { label: '[예약하기] 수요조사란 무엇인가요?', content: FAQReservation1 },
  { label: '[예약하기] 예약은 언제할 수 있나요?', content: FAQReservation2 },
  {
    label: '[예약하기] 수요조사로 몇 명이 모여야 셔틀이 열리나요?',
    content: FAQReservation3,
  },
  {
    label: '[예약하기] 수요조사 중 원하는 정류장이 없어요.',
    content: FAQReservation4,
  },
  {
    label: '[예약하기] 셔틀 운행은 언제 확정되나요?',
    content: FAQReservation5,
  },
  {
    label: '[예약하기] 좌석이 매진되었어요. 추가 셔틀은 안 열리나요?',
    content: FAQReservation6,
  },
  {
    label: '[예약하기] 예약 내역을 확인하고 싶어요.',
    content: FAQReservation7,
  },
  { label: '[예약하기] 탑승지를 변경하고 싶어요.', content: FAQReservation8 },
  { label: '[예약하기] 예약을 취소하고 싶어요', content: FAQReservation9 },
  { label: '[탑승하기] 운행 시 휴게소에 들르나요?', content: FAQBoarding1 },
  { label: '[탑승하기] 어떤 버스로 운행되나요?', content: FAQBoarding2 },
  { label: '[탑승하기] 좌석은 어떻게 정해지나요?', content: FAQBoarding3 },
  {
    label: '[탑승하기] 셔틀버스에 짐을 놓고 내려도 되나요?',
    content: FAQBoarding4,
  },
  {
    label: '[탑승하기] 편도 예매 후, 왕복으로 바꾸고 싶어요.',
    content: FAQBoarding5,
  },
  {
    label: '[탑승하기] 왕복 예매 후, 편도만 탑승해도 되나요?',
    content: FAQBoarding6,
  },
  { label: '[그외] 가입 쿠폰을 받지 못했어요.', content: FAQEtc1 },
  { label: '[그외] 핸디가 뭐에요?', content: FAQEtc2 },
] as const;
