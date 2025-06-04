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
import FAQReservation10 from './reservation-10.mdx';
import FAQReservation11 from './reservation-11.mdx';
import FAQBoarding1 from './boarding-1-does-shuttle-stop-at-rest-area.mdx';
import FAQBoarding2 from './boarding-2-what-bus-is-used-for-service.mdx';
import FAQBoarding3 from './boarding-3-how-are-seats-assigned.mdx';
import FAQBoarding4 from './boarding-4-leave-luggage-on-shuttle.mdx';
import FAQBoarding5 from './boarding-5-change-one-way-to-round-trip.mdx';
import FAQBoarding6 from './boarding-6-use-one-way-from-round-trip.mdx';
import FAQEtc1 from './etc-1-what-is-handy.mdx';

interface FAQ {
  title: string;
  tag: 'reservation' | 'boarding' | 'etc';
  content: ReactNode;
}

export const faqs: FAQ[] = (
  [
    [FAQReservation1, 'reservation', '수요조사란 무엇인가요?'],
    [FAQReservation2, 'reservation', '예약은 언제할 수 있나요?'],
    [
      FAQReservation3,
      'reservation',
      '수요조사로 몇 명이 모여야 셔틀이 열리나요?',
    ],
    [FAQReservation4, 'reservation', '셔틀 운행은 언제 확정되나요?'],
    [
      FAQReservation5,
      'reservation',
      '열린 셔틀 중 예약하고 싶은 정류장이 없어요. ',
    ],
    [
      FAQReservation6,
      'reservation',
      '좌석이 매진되었어요. 추가 셔틀은 안 열리나요?',
    ],
    [FAQReservation7, 'reservation', '예약 내역을 확인하고 싶어요.'],
    [FAQReservation8, 'reservation', '탑승지를 변경하고 싶어요.'],
    [FAQReservation9, 'reservation', '예약을 취소하고 싶어요'],
    [
      FAQReservation10,
      'reservation',
      '탑승자와 신청자가 다른 경우 어떡하나요?',
    ],
    [
      FAQReservation11,
      'reservation',
      '콘서트가 예정보다 늦게 끝나면 어떡하나요?',
    ],
    [FAQBoarding1, 'boarding', '운행 시 휴게소에 들르나요?'],
    [FAQBoarding2, 'boarding', '어떤 버스로 운행되나요?'],
    [FAQBoarding3, 'boarding', '좌석은 어떻게 정해지나요?'],
    [FAQBoarding4, 'boarding', '셔틀버스에 짐을 놓고 내려도 되나요?'],
    [FAQBoarding5, 'boarding', '편도 예매 후, 왕복으로 바꾸고 싶어요.'],
    [FAQBoarding6, 'boarding', '왕복 예매 후, 편도만 탑승해도 되나요?'],
    [FAQEtc1, 'etc', '핸디가 뭐에요?'],
  ] as const
).map(([Content, tag, title]) => {
  return {
    title,
    tag,
    content: <Content />,
  };
});
