'use client';

import Header from '@/components/header/Header';
import OpenedGiftIcon from '../icons/gift-opened.svg';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';

const AlreadyAcceptedScreen = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <section className="mt-96 flex flex-col items-center">
          <h1 className="pb-4 text-22 font-700 leading-[140%]">
            이미 받은 탑승권이에요
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
            onClick={() => router.push('/history?type=reservation')}
          >
            예약 정보 확인하기
          </Button>
          <Button
            type="button"
            variant="text"
            size="large"
            onClick={() => router.push('/')}
          >
            나중에 할게요
          </Button>
        </div>
      </main>
    </>
  );
};

export default AlreadyAcceptedScreen;
