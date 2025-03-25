'use client';

import Button from '@/components/buttons/button/Button';

const DemandHubInfoStep = () => {
  return (
    <section className="flex w-full flex-col gap-16">
      <article className="flex flex-col items-center gap-8 rounded-8 bg-basic-grey-50 py-12">
        <h3 className="text-18 font-600 leading-[160%] text-basic-grey-700">
          정류장명
        </h3>
        <p className="text-14 font-500 text-brand-primary-400">
          NN명이 요청했어요
        </p>
      </article>
      <Button variant="primary" size="large" type="button">
        요청하기
      </Button>
    </section>
  );
};

export default DemandHubInfoStep;
