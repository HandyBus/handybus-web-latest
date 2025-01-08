'use client';

import { authInstance } from '@/services/config';
import Script from 'next/script';
import { PassengerInfoType } from '../page';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { toast } from 'react-toastify';
import { finalPrice } from './priceDetail.util';
import { useFormContext } from 'react-hook-form';
import { ShuttleRouteType } from '@/types/shuttle.types';
import { IssuedCouponType } from '@/types/client.types';
import { getUser } from '@/services/users';
import { CustomError } from '@/services/custom-error';
import { BillingReservations } from '../types/reservationWrite.type';
import { generateCustomerKey } from '../utils/reservationWrite.util';

declare global {
  interface Window {
    TossPayments: new (clientKey: string) => {
      widgets: (options: { customerKey: string }) => {
        setAmount: (options: { value: number; currency: string }) => void;
        renderPaymentMethods: (options: {
          selector: string;
          variantKey: string;
        }) => void;
        renderAgreement: (options: {
          selector: string;
          variantKey: string;
        }) => void;
        requestPayment: (options: {
          orderId: string;
          orderName: string;
          customerEmail?: string;
          customerName?: string;
          customerMobilePhone?: string;
          successUrl: string;
          failUrl: string;
        }) => Promise<void>;
      };
    };
  }
}

interface Props {
  shuttleRouteId: number;
  type: 'ROUND_TRIP' | 'TO_DESTINATION' | 'FROM_DESTINATION';
  toDestinationShuttleRouteHubId: number;
  fromDestinationShuttleRouteHubId: number;
  passengers: PassengerInfoType[];
  isSupportingHandy?: boolean;
  shuttleData: ShuttleRouteType[];
}

const TossPayment = ({
  shuttleRouteId,
  type,
  toDestinationShuttleRouteHubId,
  fromDestinationShuttleRouteHubId,
  passengers,
  isSupportingHandy = false,
  shuttleData,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getValues, watch } = useFormContext();
  const selectedCoupon: IssuedCouponType = watch('selectedCoupon');
  const watchShuttleRoute = getValues('shuttleRoute');
  const tripType = getValues('tripType');
  const passengerCount = getValues('passengerCount');
  const currentShuttleData = shuttleData.find(
    (v) => v.shuttleRouteId === watchShuttleRoute?.value,
  );
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        console.log('💵 (CLIENT) userData', res);
        setUserId(res.userId);
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded && userId) {
      initializeTossPayments();
    }
  }, [loaded, userId]);

  const requestPrice =
    currentShuttleData && tripType
      ? finalPrice({
          currentShuttleData,
          tripType,
          passengerCount,
          selectedCoupon,
        })
      : undefined;

  const billingReservationData = useMemo(() => {
    return {
      shuttleRouteId,
      type,
      ...((type === 'ROUND_TRIP' || type === 'TO_DESTINATION') && {
        toDestinationShuttleRouteHubId: Number(toDestinationShuttleRouteHubId),
      }),
      ...((type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') && {
        fromDestinationShuttleRouteHubId: Number(
          fromDestinationShuttleRouteHubId,
        ),
      }),
      ...(selectedCoupon && {
        issuedCouponId: selectedCoupon.issuedCouponId,
      }),
      isSupportingHandy,
      passengers: passengers.slice(0, passengerCount),
    };
  }, [
    shuttleRouteId,
    type,
    toDestinationShuttleRouteHubId,
    fromDestinationShuttleRouteHubId,
    selectedCoupon,
    isSupportingHandy,
    passengers,
  ]);

  const initializeTossPayments = useCallback(async () => {
    try {
      if (typeof window.TossPayments === 'undefined')
        throw new Error('TossPayments SDK가 로드되지 않았습니다.');

      // const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY; //NOTES: 토스페이먼츠 심사 이후 정식 키 교환필요
      const clientKey = 'test_gck_DLJOpm5Qrld0vRJb02RPrPNdxbWn';
      if (!clientKey)
        throw new Error('TossPayments client key가 설정되지 않았습니다.');

      const tossPayments = new window.TossPayments(clientKey);

      if (typeof userId !== 'number')
        throw new Error('유저 정보를 불러오는데 실패했습니다.');
      const customerKey = await generateCustomerKey(userId);
      console.log('💵(TOSSPAYMENTS) customerKey', customerKey);

      const widgets = tossPayments.widgets({
        customerKey: customerKey,
      });

      if (!requestPrice) throw new Error('requestPrice is undefined');
      widgets.setAmount({
        value: requestPrice,
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

      const button = document.getElementById('payment-button');
      button?.addEventListener('click', async function () {
        console.log(
          '💵 (TOSSPAYMENTS) 결제 버튼 클릭 + billingReservationData',
          billingReservationData,
        );
        const prepareBillingResponse = await authInstance.post<{
          reservation: BillingReservations;
        }>(`/v1/billing/reservations`, billingReservationData);

        const successUrl =
          window.location.origin +
          pathname +
          `/payments/${prepareBillingResponse.reservation.reservationId}/success`;
        const failUrl = window.location.origin + pathname + `/payments/fail`;

        await widgets.requestPayment({
          orderId: prepareBillingResponse.reservation.paymentId,
          orderName: '(TEST) 핸디버스 토스 티셔츠 외 2건',
          customerName: passengers[0].name,
          customerMobilePhone: passengers[0].phoneNumber,
          successUrl: successUrl,
          failUrl: failUrl,
        });
      });
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        router.push('/login');
      }
      console.error('토스 결제 초기화 실패:', error);
      toast.error('결제 요청 실패, 다시 시도해 주세요.');
    }
  }, [billingReservationData, userId]);

  return (
    <>
      <section className="h-[354px]">
        <div id="payment-method"></div>
        <div id="agreement"></div>
      </section>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onReady={() => setLoaded(true)}
        strategy="lazyOnload"
      />
      <div className="h-[354px]"></div>
      <BottomBar
        id="payment-button"
        type={`RESERVATION_WRITE_3` as BottomBarType}
        currentShuttleData={currentShuttleData}
      />
    </>
  );
};

TossPayment.displayName = 'TossPayment';

export default TossPayment;
