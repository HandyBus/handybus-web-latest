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

export const faqs: FAQ[] = (
  [
    [FAQ1, '예약이 잘 되었는지 확인하고 싶어요'],
    [FAQ2, '예약한 셔틀의 탑승지를 변경하고 싶어요.'],
    [FAQ3, '예약한 셔틀을 환불받고 싶어요.'],
    [FAQ4, '셔틀 운행 시 휴게소를 들르나요?'],
    [FAQ5, '원하는 셔틀이 없어요.'],
    [FAQ6, '수요조사 인원이 몇 명 모여야 셔틀이 개설되나요?'],
    [FAQ7, '어떤 버스로 운행되나요?'],
  ] as const
).map(([Content, title]) => {
  return {
    title: title,
    content: <Content />,
  };
});
