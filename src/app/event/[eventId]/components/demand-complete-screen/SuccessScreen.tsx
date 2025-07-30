'use client';

import Button from '@/components/buttons/button/Button';
import SuccessIcon from '../../icons/demand-success.svg';
import { DemandCompleteStatus } from './DemandCompleteScreen';

interface Props {
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
  demandCount?: number;
  openShareBottomSheet: () => void;
}

const SuccessScreen = ({
  setDemandCompleteStatus,
  demandCount,
  openShareBottomSheet,
}: Props) => {
  return (
    <div className="fixed inset-0 z-[101] mx-auto flex max-w-[500px] flex-col items-center bg-basic-white">
      <section className="mt-180 flex flex-col items-center">
        <h3 className="mb-4 text-center text-22 font-700">
          수요조사 완료!
          <br />
          쿠폰이 발급되었어요
        </h3>
        <p className="mb-24 text-center text-16 font-500 text-basic-grey-600">
          셔틀이 열리면 카카오톡으로 알려드릴게요.
          <br />
          예약 시 할인 쿠폰을 사용할 수 있어요.
        </p>
        <SuccessIcon />
      </section>
      <section className="mt-auto flex w-full flex-col items-center">
        {demandCount && (
          <p className="text-16 font-600">
            같은 지역을 신청한 사람은{' '}
            <span className="text-brand-primary-400">{demandCount}</span>
            명이에요!
          </p>
        )}
        <div className="flex w-full items-center gap-8 p-16">
          <Button
            variant="secondary"
            size="large"
            onClick={openShareBottomSheet}
          >
            친구도 알려주기
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={() => setDemandCompleteStatus(null)}
          >
            완료
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SuccessScreen;
