'use client';

import Button from '@/components/buttons/button/Button';
import FailBusIcon from '../icons/bus-fail.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import { useRouter } from 'next/navigation';

interface Props {
  searchParams: {
    code?: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const [code, setCode] = useState<string | undefined>(searchParams.code);

  useEffect(() => {
    setCode(searchParams.code);
  }, [searchParams.code]);

  const router = useRouter();
  const handleRedirectToHome = () => {
    router.replace('/');
  };

  const [showFeedbackScreen, setShowFeedbackScreen] = useState(false);
  if (showFeedbackScreen) {
    return (
      <FeedbackScreen
        subject="예약 - 실패"
        closeFeedbackScreen={() => setShowFeedbackScreen(false)}
      />
    );
  }

  if (code === '409') {
    return (
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">이미 완료된 셔틀 예약입니다</h1>
          <p className="pb-24 text-center text-16 font-500 text-basic-grey-500">
            내역에서 확인해주세요.
          </p>
          <FailBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <button type="button" onClick={handleRedirectToHome}>
            <Button variant="primary" size="large">
              돌아가기
            </Button>
          </button>
          <button
            type="button"
            className="flex h-[46px] w-full items-center justify-center text-16 font-600 text-basic-grey-700"
            onClick={() => setShowFeedbackScreen(true)}
          >
            의견 보내기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative grow">
      <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
        <h1 className="flex justify-center pb-4 text-22 font-700 leading-[39.2px]">
          셔틀 예약을 완료하지 못했어요
        </h1>
        <p className="pb-24 text-center text-16 font-500 leading-[25.6px] text-basic-grey-500">
          결제 과정에서 문제가 발생했어요.
          <br />
          마이페이지에서 결제 내역을 확인해 주세요.
        </p>
        <FailBusIcon />
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
        <button type="button" onClick={handleRedirectToHome}>
          <Button variant="primary" size="large">
            돌아가기
          </Button>
        </button>
        <Button
          variant="text"
          size="large"
          onClick={() => setShowFeedbackScreen(true)}
        >
          의견 보내기
        </Button>
      </div>
    </main>
  );
};

export default Page;
