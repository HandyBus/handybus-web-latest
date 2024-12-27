'use client';

import { authInstance } from '@/services/config';
import Script from 'next/script';
import { PassengerInfoType } from '../page';
import router from 'next/router';

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
  toDestinationShuttleRouteHubId: number;
  fromDestinationShuttleRouteHubId: number;
  passengers: PassengerInfoType[];
  isSupportingHandy?: boolean;
}

const TossPayment = ({
  shuttleRouteId,
  type,
  toDestinationShuttleRouteHubId,
  fromDestinationShuttleRouteHubId,
  passengers,
  isSupportingHandy = false,
}: Props) => {
  const initializeTossPayments = () => {
    try {
      if (typeof window.TossPayments === 'undefined') {
        throw new Error('TossPayments SDK가 로드되지 않았습니다.');
      }
      // const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
      const clientKey = 'test_gck_DLJOpm5Qrld0vRJb02RPrPNdxbWn';
      const tossPayments = new window.TossPayments(clientKey);
      const customerKey = 'fTBOkAEVnsROyhzqP6KW8'; // NOTES: 프론트에서 유저마다 고유한 랜덤 키 (UUID or guest는 'ANONYMOUS')생성필요
      console.log('1');
      const widgets = tossPayments.widgets({
        // customerKey: 'ANONYMOUS',
        customerKey: customerKey,
      });
      console.log('2');

      // 결제 금액 설정
      widgets.setAmount({
        value: 30000,
        currency: 'KRW',
      });
      console.log('3');
      // 결제 UI 렌더링
      widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      console.log('4');

      // 약관 UI 렌더링
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });
      console.log('5');

      const button = document.getElementById('payment-button');
      button?.addEventListener('click', async function () {
        const prepareBillingResponse: BillingReservations =
          await authInstance.post(`/billing/reservations`, {
            shuttleRouteId,
            type,
            toDestinationShuttleRouteHubId,
            fromDestinationShuttleRouteHubId,
            // issuedCouponId: 1000,
            isSupportingHandy,
            passengers,
          });
        console.log(
          '💵 (API SERVER) prepareBillingResponse',
          prepareBillingResponse,
        );
        await widgets
          .requestPayment({
            orderId: prepareBillingResponse.reservation.paymentId,
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
              const apiResponse = authInstance.post(
                `/billing/payments/${res.orderId}`,
                {
                  paymentKey: res.paymentKey,
                  pgType: 'TOSS',
                },
              );
              console.log('💵(API SERVER) 결제 승인 API 요청', apiResponse);
            },
          )
          .catch((error) => {
            console.log('💵(TOSSPAYMENTS) 결제 요청 실패', error);
          });
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      }
      console.error('토스 결제 초기화 실패:', error);
    }
  };

  return (
    <>
      <section className="h-[354px]">
        {/* 결제 UI */}
        <div id="payment-method"></div>
        {/* 이용약관 UI */}
        <div id="agreement"></div>
        {/* 결제하기 버튼 */}
        <button
          id="payment-button"
          className="rounded-12 w-full bg-primary-400 py-16 text-18 font-500 leading-[25.2px] text-white"
        >
          (테스트용)결제하기
        </button>
      </section>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onLoad={initializeTossPayments}
        strategy="afterInteractive"
      />
      <div className="h-[354px]"></div>
    </>
  );
};

export default TossPayment;

export interface BillingReservations {
  reservation: {
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
  };
}
