import type { ReactNode } from 'react';

import FAQ1 from './1-sure.mdx';
import FAQ2 from './2-change.mdx';
import FAQ3 from './3-refund.mdx';
import FAQ4 from './4-stop.mdx';
import FAQ5 from './5-no.mdx';
import FAQ6 from './6-threshold.mdx';
import FAQ7 from './7-bus.mdx';

interface FAQ {
  title: string;
  content: ReactNode;
}

export const faqs: FAQ[] = [
  {
    title: '예약이 잘 되었는지 확인하고 싶어요',
    content: <FAQ1 />,
  },
  {
    title: '예약한 셔틀의 탑승지를 변경하고 싶어요.',
    content: <FAQ2 />,
  },
  {
    title: '예약한 셔틀을 환불받고 싶어요.',
    content: <FAQ3 />,
  },
  {
    title: '셔틀 운행 시 휴게소를 들르나요?',
    content: <FAQ4 />,
  },
  {
    title: '원하는 셔틀이 없어요.',
    content: <FAQ5 />,
  },
  {
    title: '셔틀 확정/무산의 기준이 무엇인가요?',
    content: <FAQ6 />,
  },
  {
    title: '어떤 버스로 운행되나요?',
    content: <FAQ7 />,
  },
];
