import type { ReactNode } from 'react';

import FAQReservation1 from './reservation-1-what-is-demand.mdx';
import FAQReservation2 from './reservation-2-when-can-i-book.mdx';
import FAQReservation3 from './reservation-3-how-many-people-needed-for-survey.mdx';
import FAQReservation4 from './reservation-4-no-desired-stop-in-survey.mdx';
import FAQReservation5 from './reservation-5-when-is-shuttle-confirmed.mdx';
import FAQReservation6 from './reservation-6-sold-out-additional-shuttle.mdx';
import FAQReservation7 from './reservation-7-check-reservation-details.mdx';
import FAQReservation8 from './reservation-8-change-boarding-location.mdx';
import FAQReservation9 from './reservation-9-cancel-reservation.mdx';
import FAQBoarding1 from './boarding-1-does-shuttle-stop-at-rest-area.mdx';
import FAQBoarding2 from './boarding-2-what-bus-is-used-for-service.mdx';
import FAQBoarding3 from './boarding-3-how-are-seats-assigned.mdx';
import FAQBoarding4 from './boarding-4-leave-luggage-on-shuttle.mdx';
import FAQBoarding5 from './boarding-5-change-one-way-to-round-trip.mdx';
import FAQBoarding6 from './boarding-6-use-one-way-from-round-trip.mdx';
import FAQEtc1 from './etc-1-what-is-handy.mdx';

interface FAQ {
  title: string;
  content: ReactNode;
}

export const faqs: FAQ[] = (
  [
    [FAQReservation1, '[예약하기] 수요조사란 무엇인가요?'],
    [FAQReservation2, '[예약하기] 예약은 언제할 수 있나요?'],
    [FAQReservation3, '[예약하기] 수요조사로 몇 명이 모여야 셔틀이 열리나요?'],
    [FAQReservation4, '[예약하기] 수요조사 중 원하는 정류장이 없어요.'],
    [FAQReservation5, '[예약하기] 셔틀 운행은 언제 확정되나요?'],
    [
      FAQReservation6,
      '[예약하기] 좌석이 매진되었어요. 추가 셔틀은 안 열리나요?',
    ],
    [FAQReservation7, '[예약하기] 예약 내역을 확인하고 싶어요.'],
    [FAQReservation8, '[예약하기] 탑승지를 변경하고 싶어요.'],
    [FAQReservation9, '[예약하기] 예약을 취소하고 싶어요'],
    [FAQBoarding1, '[탑승하기] 운행 시 휴게소에 들르나요?'],
    [FAQBoarding2, '[탑승하기] 어떤 버스로 운행되나요?'],
    [FAQBoarding3, '[탑승하기] 좌석은 어떻게 정해지나요?'],
    [FAQBoarding4, '[탑승하기] 셔틀버스에 짐을 놓고 내려도 되나요?'],
    [FAQBoarding5, '[탑승하기] 편도 예매 후, 왕복으로 바꾸고 싶어요.'],
    [FAQBoarding6, '[탑승하기] 왕복 예매 후, 편도만 탑승해도 되나요?'],
    [FAQEtc1, '[그외] 핸디가 뭐에요?'],
  ] as const
).map(([Content, title]) => {
  return {
    title: title,
    content: <Content />,
  };
});
