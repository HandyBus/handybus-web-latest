'use client';

import Button from '@/components/buttons/button/Button';

const ExtraSeatAlarmStep = () => {
  return (
    <section className="flex w-full flex-col items-center gap-16">
      <article className="flex w-full flex-col items-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
        <h3 className="text-18 font-600 leading-[160%] text-basic-grey-700">
          정류장명
        </h3>
        <p className="text-14 font-500 leading-[160%] text-brand-primary-400">
          NN번째로 알림 대기 중이에요!
        </p>
      </article>
      <div className="flex w-full flex-col gap-8">
        <Button variant="primary" size="large" className="w-full">
          확인했어요
        </Button>
        <Button variant="tertiary" size="large" className="w-full">
          의견 보내기
        </Button>
      </div>
    </section>
  );
};

export default ExtraSeatAlarmStep;
