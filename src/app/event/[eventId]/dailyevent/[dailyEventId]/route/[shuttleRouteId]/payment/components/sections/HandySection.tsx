'use client';

import Section from '../Section';

const HandySection = () => {
  return (
    <Section heading={<span>핸디 지원</span>}>
      <p className="rounded-[8px] bg-basic-grey-50 p-8 text-12 font-600 leading-[160%] text-basic-grey-500">
        2025년 8월 1일부터 모바일 탑승권이 생기면서 핸디 없이도 안전하고
        편리하게 탑승할 수 있게 되었어요. 이로 인해 핸디 지원과 함께 제공되던
        할인 혜택도 함께 종료됩니다.
      </p>
    </Section>
  );
};

export default HandySection;
