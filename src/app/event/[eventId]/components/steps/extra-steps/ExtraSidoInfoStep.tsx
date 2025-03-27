'use client';

import Button from '@/components/buttons/button/Button';

interface Props {
  toExtraOpenSidoStep: () => void;
  toDemandHubsStep: () => void;
}

const ExtraSidoInfoStep = ({
  toExtraOpenSidoStep,
  toDemandHubsStep,
}: Props) => {
  return (
    <section className="flex w-full flex-col gap-16">
      <article className="flex flex-col items-center gap-8 rounded-8 bg-basic-grey-50 py-12">
        <h3 className="text-18 font-600 leading-[160%] text-basic-grey-700">
          참여 인원
        </h3>
        <p className="text-14 font-500 text-basic-grey-700">
          지금까지 <span className="text-brand-primary-400">NN명</span>이
          참여했어요
        </p>
      </article>
      <div className="flex gap-8">
        <Button
          onClick={toExtraOpenSidoStep}
          variant="tertiary"
          size="large"
          type="button"
        >
          열린 셔틀 보기
        </Button>
        <Button
          onClick={toDemandHubsStep}
          variant="primary"
          size="large"
          type="button"
        >
          요청하기
        </Button>
      </div>
    </section>
  );
};

export default ExtraSidoInfoStep;
