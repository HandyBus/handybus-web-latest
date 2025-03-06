'use client';

import { CustomError } from '@/services/custom-error';
import { postApprovePayment } from '@/services/payment.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import usePreventScroll from '@/hooks/usePreventScroll';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import { getUserReservation } from '@/services/reservation.service';
import { setTimeoutWithRetry } from '@/utils/setTimeoutWithRetry';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const reservationId = searchParams.get('reservationId');
  const isInitiated = useRef(false);

  const polling = async (reservationId: string) => {
    const res = await getUserReservation(reservationId);
    if (res.reservation.reservationStatus === 'COMPLETE_PAYMENT') {
      router.replace(pathname + `/${res.reservation.reservationId}`);
    }
  };

  usePreventRefresh();
  usePreventScroll();

  const handlePolling = async (reservationId: string, error: CustomError) => {
    try {
      await setTimeoutWithRetry(() => polling(reservationId), 3, 3000);
    } catch {
      if (error.statusCode === 402) {
        router.replace(
          pathname +
            `/fail?code=${error?.statusCode}&userExceptionMessage=${error.message}`,
        );
      } else router.replace(pathname + `/fail?code=${error?.statusCode}`);
    }
  };

  const callPaymentConfirmation = async () => {
    try {
      const orderId = searchParams.get('orderId');
      const paymentKey = searchParams.get('paymentKey');

      if (!orderId || !paymentKey) {
        throw new CustomError(400, '구매키가 존재하지 않습니다.');
      }

      const res = await postApprovePayment(orderId, paymentKey);
      router.replace(pathname + `/${res.reservationId}`);
    } catch (e) {
      const error = e as CustomError;
      await handlePolling(reservationId ?? '', error);
    }
  };

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    callPaymentConfirmation();
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
