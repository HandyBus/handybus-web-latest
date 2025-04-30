'use client';

import Button from '@/components/buttons/button/Button';
import SuccessIcon from '../../icons/demand-success.svg';
import { DemandCompleteStatus } from './DemandCompleteScreen';

interface Props {
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
}

const SuccessScreen = ({ setDemandCompleteStatus }: Props) => {
  return (
    <div className="fixed inset-0 z-[101] mx-auto flex max-w-[500px] flex-col items-center bg-basic-white">
      <section className="mt-180 flex flex-col items-center">
        <h3 className="mb-4 text-22 font-700">요청이 완료되었어요</h3>
        <p className="mb-24 text-center text-16 font-500 text-basic-grey-600">
          셔틀이 열리면 카카오톡으로 알림을 드릴게요.
          <br />
          마이페이지에서 요청 내역을 확인할 수 있어요.
        </p>
        <SuccessIcon />
      </section>
      <section className="mt-auto flex w-full flex-col items-center gap-8 p-16">
        <Button
          variant="primary"
          size="large"
          onClick={() => setDemandCompleteStatus(null)}
        >
          완료
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

export default SuccessScreen;
