'use client';

import Button from '@/components/buttons/button/Button';
import FailIcon from '../../icons/demand-fail.svg';
import { DemandCompleteStatus } from './DemandCompleteScreen';

interface Props {
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
}

const FailScreen = ({ setDemandCompleteStatus }: Props) => {
  return (
    <div className="fixed inset-0 z-[101] mx-auto flex max-w-[500px] flex-col items-center bg-basic-white">
      <section className="mt-180 flex flex-col items-center">
        <h3 className="mb-4 text-22 font-700">수요조사를 완료하지 못했어요</h3>
        <p className="mb-24 text-center text-16 font-500 text-basic-grey-600">
          참여 과정에서 예상치 못한 오류가 발생했어요.
          <br />
          다시 시도해 주세요.
        </p>
        <FailIcon />
      </section>
      <section className="mt-auto flex w-full flex-col items-center gap-8 p-16">
        <Button
          variant="primary"
          size="large"
          onClick={() => setDemandCompleteStatus(null)}
        >
          돌아가기
        </Button>
        <Button
          variant="text"
          size="large"
          onClick={() => setDemandCompleteStatus('feedback')}
        >
          의견 보내기
        </Button>
      </section>
    </div>
  );
};

export default FailScreen;
