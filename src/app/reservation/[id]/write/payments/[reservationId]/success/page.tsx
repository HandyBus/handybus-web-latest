'use client';

import { authInstance } from '@/services/config';
import { CustomError } from '@/services/custom-error';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { PaymentReservation } from '../../../types/reservationWrite.type';

const PaymentsSuccess = () => {
  let mounted = true;
  const queryParam = useSearchParams();
  const orderId = queryParam.get('orderId');
  const paymentKey = queryParam.get('paymentKey');
  const router = useRouter();
  const pathname = usePathname();
  const shuttleId = pathname.split('/')[2];
  const urlBody = `/reservation/${shuttleId}/write`;

  useEffect(() => {
    const callPaymentConfirmation = async () => {
      if (!mounted) return;
      mounted = false;

      try {
        const apiResponse = await authInstance.post<{
          payments: PaymentReservation;
        }>(`/v1/billing/payments/${orderId}`, {
          paymentKey,
          pgType: 'TOSS',
        });

        const reservationId = apiResponse.payments.reservationId;
        const urlCompleted = `/payments/${reservationId}/completed`;
        const url = urlBody + urlCompleted;
        router.replace(url);
      } catch (error) {
        const urlFail = urlBody + '/payments/fail';
        const urlConflict = urlBody + '/payments/conflict';
        if (error instanceof CustomError && error.statusCode === 409)
          router.replace(urlConflict);
        else router.replace(urlFail);
      }
    };

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

export default PaymentsSuccess;
