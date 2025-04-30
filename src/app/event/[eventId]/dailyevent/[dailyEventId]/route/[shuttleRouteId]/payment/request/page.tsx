'use client';

import { CustomError } from '@/services/custom-error';
import { postApprovePayment } from '@/services/payment.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import usePreventScroll from '@/hooks/usePreventScroll';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import { getUserReservation } from '@/services/reservation.service';
import { setTimeoutWithRetry } from '@/utils/setTimeoutWithRetry';
import LoadingBusIcon from './icons/bus-loading.svg';

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
      router.replace(pathname + `/fail?code=${error?.statusCode}`);
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
    <main className="relative grow">
      <div className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
        <h1 className="pb-4 text-22 font-700">결제가 진행되고 있어요</h1>
        <p className="pb-24 text-16 font-500 text-basic-grey-600">
          잠시만 기다려 주세요. 곧 결제가 완료돼요.
        </p>
        <LoadingBusIcon />
      </div>
    </main>
  );
};

export default Page;
