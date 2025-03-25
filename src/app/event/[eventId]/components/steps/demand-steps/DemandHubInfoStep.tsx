'use client';

import Button from '@/components/buttons/button/Button';

const DemandHubInfoStep = () => {
  return (
    <section className="flex w-full flex-col gap-16">
      <article className="flex flex-col items-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
        <h3 className="text-center text-18 font-600 leading-[160%] text-basic-grey-700">
          <span>[왕복]</span>
          <br />
          <span>정류장명</span>
        </h3>
      </article>
      <Button variant="primary" size="large" type="button">
        요청하기
      </Button>
    </section>
  );
};

export default DemandHubInfoStep;
