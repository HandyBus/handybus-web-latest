'use client';

import { postBillingPayment } from '@/services/billing';
import { CustomError } from '@/services/custom-error';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isInitiated = useRef(false);

  const callPaymentConfirmation = async () => {
    try {
      const orderId = searchParams.get('orderId');
      const paymentKey = searchParams.get('paymentKey');

      if (!orderId || !paymentKey) {
        throw new CustomError(400, '구매키가 존재하지 않습니다.');
      }

      await postBillingPayment(orderId, paymentKey);

      router.replace(pathname + '/completed');
    } catch (e) {
      const error = e as CustomError;
      router.replace(pathname + `/fail?code=${error?.statusCode}`);
    }
  };

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    callPaymentConfirmation();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-24">
      <BeatLoader color="#9edbcc" />
      <div className="flex flex-col gap-[6px]">
        <h1 className="flex justify-center text-[28px] font-700 leading-[39.2px]">
          결제 중 입니다
        </h1>
        <p className="text-gray-500 text-[16px] font-400 leading-[25.6px]">
          페이지를 벗어나거나 새로고침을 하지 마세요.
        </p>
      </div>
    </div>
  );
};

export default Page;
