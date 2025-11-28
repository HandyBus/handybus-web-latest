'use client';

import PresentIcon from './icons/present.svg';
import Button from '@/components/buttons/button/Button';
import Header from '@/components/header/Header';
import { useRouter } from 'next/navigation';

const ReservationTransferSuccess = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <section className="mt-96 flex flex-col items-center">
          <h1 className="pb-4 text-22 font-700 leading-[140%]">
            탑승권을 선물했어요
          </h1>
          <p className="pb-24 text-16 font-500 leading-[160%] text-basic-grey-600">
            상대방이 수락하면 전달이 완료돼요.
          </p>
          <PresentIcon />
        </section>
        <div className="flex-1" />
        <div className="p-16">
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={() => router.push('/history?type=reservation')}
          >
            완료
          </Button>
        </div>
      </main>
    </>
  );
};

export default ReservationTransferSuccess;
