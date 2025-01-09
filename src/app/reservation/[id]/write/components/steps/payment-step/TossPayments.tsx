'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';
import { getUser } from '@/services/users';
import { CustomError } from '@/services/custom-error';
import logout from '@/app/actions/logout.action';
import { ReservationFormValues } from '../../Form';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { postBillingReservation } from '@/services/billing';
import { generateCustomerKey } from '../../../reservation.util';

declare global {
  interface Window {
    TossPayments: new (clientKey: string) => {
      widgets: (options: { customerKey: string }) => TossPaymentsWidgets;
    };
  }
}

const TossPayments = () => {
  const pathname = usePathname();
  const { getValues } = useFormContext<ReservationFormValues>();

  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<number>();

  const loadUserId = useCallback(async () => {
    try {
      const res = await getUser();
      setUserId(res.userId);
    } catch (error) {
      console.error('사용자 정보 로딩 실패:', error);
      logout();
    }
  }, []);

  useEffect(() => {
    loadUserId();
  }, []);

  const initializeTossPayments = useCallback(async () => {
    try {
      if (typeof window.TossPayments === 'undefined') {
        throw new CustomError(400, 'TossPayments SDK가 로드되지 않았습니다.');
      }

      const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
      if (!clientKey) {
        throw new CustomError(
          400,
          'TossPayments client key가 설정되지 않았습니다.',
        );
      }
      const tossPayments = new window.TossPayments(clientKey);

      if (!userId) {
        throw new CustomError(401, '유저 정보를 불러오는데 실패했습니다.');
      }
      const customerKey = await generateCustomerKey(userId);

      const widgets = tossPayments.widgets({
        customerKey: customerKey,
      });

      const finalPrice = getValues('finalPrice');
      if (!finalPrice) {
        throw new CustomError(400, '최종 가격이 존재하지 않습니다..');
      }

      widgets.setAmount({
        value: finalPrice,
        currency: 'KRW',
      });
      widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      const paymentButton = document.getElementById('payment-button');
      if (paymentButton) {
        paymentButton.addEventListener('click', () => {
          handlePayment(widgets);
        });
      }
    } catch (e) {
      const error = e as CustomError;
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    }
  }, [userId]);

  useEffect(() => {
    if (loaded && userId) {
      initializeTossPayments();
    }
  }, [loaded, userId]);

  const handlePayment = async (widgets: TossPaymentsWidgets) => {
    try {
      const formValues = getValues();
      const parsedFormValues = {
        shuttleRouteId: formValues.shuttleRoute.shuttleRouteId,
        type: formValues.type,
        toDestinationShuttleRouteHubId:
          formValues.hub.toDestinationHub?.shuttleRouteHubId,
        fromDestinationShuttleRouteHubId:
          formValues.hub.fromDestinationHub?.shuttleRouteHubId,
        issuedCouponId: formValues.issuedCouponId,
        isSupportingHandy: formValues.isSupportingHandy,
        passengers: formValues.passengers,
      };
      const res = await postBillingReservation(parsedFormValues);

      const successUrl =
        window.location.origin + pathname + `/payments/${res.reservationId}`;
      const failUrl = window.location.origin + pathname + `/payments/fail`;

      await widgets.requestPayment({
        orderId: res.paymentId,
        orderName: formValues.shuttleRoute.name,
        successUrl,
        failUrl,
      });
    } catch (e) {
      console.error(e);
      if (!(e instanceof CustomError)) {
        return;
      }
      if (e.statusCode === 403) {
        toast.error('예약이 마감되었습니다.');
      }
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <section>
        <div id="payment-method"></div>
        <div id="agreement"></div>
      </section>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onReady={() => setLoaded(true)}
        strategy="afterInteractive"
      />
    </>
  );
};

export default TossPayments;
