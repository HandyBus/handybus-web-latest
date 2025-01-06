'use client';

import { authInstance } from '@/services/config';
import Script from 'next/script';
import { PassengerInfoType } from '../page';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { toast } from 'react-toastify';
import { finalPrice } from './priceDetail.util';
import { useFormContext } from 'react-hook-form';
import { ShuttleRouteType } from '@/types/shuttle.types';
import { IssuedCouponType } from '@/types/client.types';
import { getUser } from '@/services/users';

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
        }) => Promise<void>;
      };
    };
  }
}

interface Props {
  shuttleRouteId: number;
  type: 'ROUND_TRIP' | 'TO_DESTINATION' | 'FROM_DESTINATION';
  toDestinationShuttleRouteHubId: string;
  fromDestinationShuttleRouteHubId: string;
  passengers: PassengerInfoType[];
  isSupportingHandy?: boolean;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  shuttleData: ShuttleRouteType[];
}

const TossPayment = ({
  shuttleRouteId,
  type,
  toDestinationShuttleRouteHubId,
  fromDestinationShuttleRouteHubId,
  passengers,
  isSupportingHandy = false,
  handleNextStep,
  handlePrevStep,
  shuttleData,
}: Props) => {
  const router = useRouter();
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
        toDestinationShuttleRouteHubId,
      }),
      ...((type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') && {
        fromDestinationShuttleRouteHubId,
      }),
      ...(selectedCoupon && {
        issuedCouponId: selectedCoupon.issuedCouponId,
      }),
      isSupportingHandy,
      passengers,
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
      if (typeof window.TossPayments === 'undefined') {
        throw new Error('TossPayments SDK가 로드되지 않았습니다.');
      }

      // const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
      const clientKey = 'test_gck_DLJOpm5Qrld0vRJb02RPrPNdxbWn';
      if (!clientKey)
        throw new Error('TossPayments client key가 설정되지 않았습니다.');

      const tossPayments = new window.TossPayments(clientKey);

      console.log('💵 현재 userId:', userId, typeof userId);
      if (typeof userId !== 'number')
        throw new Error('유저 정보를 불러오는데 실패했습니다.');
      const customerKey = await generateCustomerKey(userId);
      console.log('💵(TOSSPAYMENTS) customerKey', customerKey);

      const widgets = tossPayments.widgets({
        customerKey: customerKey,
      });

      // 결제 금액 설정
      if (!requestPrice) throw new Error('requestPrice is undefined');
      widgets.setAmount({
        value: requestPrice,
        currency: 'KRW',
      });

      // 결제 UI 렌더링
      widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });

      // 약관 UI 렌더링
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      const button = document.getElementById('payment-button');
      button?.addEventListener('click', async function () {
        const prepareBillingResponse: BillingReservations = await authInstance
          .post<{ reservation: BillingReservations }>(
            `/billing/reservations`,
            billingReservationData,
          )
          .then((res) => {
            console.log('💵 (API SERVER) prepareBillingResponse', res);
            return res.reservation;
          })
          .catch((error) => {
            console.log('💵 (API SERVER) prepareBillingResponse 실패', error);
            console.log(
              '💵 (API SERVER, billingReservationData)',
              billingReservationData,
            );
            toast.error('결제 요청 실패, 처음부터 다시 시작해 주세요.');
            throw new Error('결제 생성 및 준비 실패');
          });

        await widgets
          .requestPayment({
            orderId: prepareBillingResponse.paymentId,
            orderName: '(TEST) 핸디버스 토스 티셔츠 외 2건',
            customerName: passengers[0].name,
            customerMobilePhone: passengers[0].phoneNumber,
          })
          .then(
            (
              res: any, // eslint-disable-line @typescript-eslint/no-explicit-any
            ) => {
              console.log('💵(TOSSPAYMENTS) 결제 요청 성공', res);
              console.log(
                '💵(API SERVER) 결제 승인 api 에 담아둘 paymentId, paymentKey',
                res.orderId,
                res.paymentKey,
              );
              // const apiResponse = authInstance
              authInstance
                .post(`/billing/payments/${res.orderId}`, {
                  paymentKey: res.paymentKey,
                  pgType: 'TOSS',
                })
                .then((res) => {
                  console.log('💵(API SERVER) 결제 승인 API 요청', res);
                  handleNextStep();
                  return res;
                })
                .catch((error) => {
                  console.log('💵(API SERVER) 결제 승인 API 요청 실패', error);
                  toast.error('결제 승인 실패, 처음부터 다시 시작해 주세요.');
                  handlePrevStep();
                });
            },
          )
          .catch((error) => {
            console.log('💵(TOSSPAYMENTS) 결제 요청 실패', error);
            toast.error('결제 요청 실패, 처음부터 다시 시작해 주세요.');
            handlePrevStep();
          });
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      }
      console.error('토스 결제 초기화 실패:', error);
    }
  }, [billingReservationData, userId]);

  return (
    <>
      <section className="h-[354px]">
        {/* 결제 UI */}
        <div id="payment-method"></div>
        {/* 이용약관 UI */}
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

export interface BillingReservations {
  reservationId: number;
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
  shuttleRouteId: number;
  pickupHubId: number;
  dropoffHubId: number;
  shuttleBusId: number;
  reservationStatus: 'NOT_PAYMENT' | 'PAYMENT_COMPLETED' | 'PAYMENT_FAILED';
  cancelStatus: 'NONE' | 'CANCELLED';
  paymentId: string;
  userId: number;
  handyStatus: 'NOT_SUPPORTED' | 'SUPPORTED';
  createdAt: string;
}

const generateCustomerKey = async (userId: number): Promise<string> => {
  const rawData = `HANDYBUS_USER_${userId}_TOSS_PAYMENTS_KEY`;
  const encoder = new TextEncoder();
  const data = encoder.encode(rawData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const base64Hash = btoa(
    hashArray.map((b) => String.fromCharCode(b)).join(''),
  );
  console.log(
    'generateCustomerKey',
    `USER_${userId}_${base64Hash.slice(0, 40).replace(/[^A-Za-z0-9\-_=.@]/g, '_')}`,
  );
  return `USER_${userId}_${base64Hash
    .slice(0, 40)
    .replace(/[^A-Za-z0-9\-_=.@]/g, '_')}`;
};
