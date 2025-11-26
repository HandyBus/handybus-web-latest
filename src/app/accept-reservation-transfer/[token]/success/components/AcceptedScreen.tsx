'use client';

import Header from '@/components/header/Header';
import OpenedGiftIcon from '../icons/gift-opened.svg';
import Button from '@/components/buttons/button/Button';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

const AcceptedScreen = () => {
  const flow = useFlow();
  const popAll = usePopAll();
  const handleNavigateToReservationInfo = () => {
    popAll({ animate: false });
    flow.replace('History', { type: 'reservation' }, { animate: false });
  };
  const handleNavigateToHome = () => {
    popAll({ animate: false });
    flow.replace('Home', {}, { animate: false });
  };
  return (
    <>
      <Header pageName="선물 완료" />
      <main className="flex grow flex-col">
        <section className="mt-96 flex flex-col items-center">
          <h1 className="pb-4 text-22 font-700 leading-[140%]">
            탑승권을 받았어요
          </h1>
          <p className="pb-24 text-16 font-500 leading-[160%] text-basic-grey-600">
            탑승 전, 예약 정보를 꼭 확인하세요.
          </p>
          <OpenedGiftIcon />
        </section>
        <div className="flex-1" />
        <div className="flex flex-col gap-8 p-16">
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={handleNavigateToReservationInfo}
          >
            예약 정보 확인하기
          </Button>
          <Button
            type="button"
            variant="text"
            size="large"
            onClick={handleNavigateToHome}
          >
            나중에 할게요
          </Button>
        </div>
      </main>
    </>
  );
};

export default AcceptedScreen;
