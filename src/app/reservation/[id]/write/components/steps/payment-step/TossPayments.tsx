'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useFormContext, useWatch } from 'react-hook-form';
import { CustomError } from '@/services/custom-error';
import { ReservationFormValues } from '../../Form';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { generateCustomerKey } from '../../../utils/reservation.util';
import { getUser } from '@/services/user.service';
import {
  postPreparePayment,
  postReserveReservation,
} from '@/services/payment.service';
import Button from '@/components/buttons/button/Button';
import { logout } from '@/utils/handleToken.util';

declare global {
  interface Window {
    TossPayments: new (clientKey: string) => {
      widgets: (options: { customerKey: string }) => TossPaymentsWidgets;
    };
  }
}

interface Props {
  handlePrevStep: () => void;
}

const TossPayments = ({ handlePrevStep }: Props) => {
  const pathname = usePathname();
  const { getValues, control } = useFormContext<ReservationFormValues>();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [tossInitialized, setTossInitialized] = useState(false);
  const tossWidgets = useRef<TossPaymentsWidgets | null>(null);

  const isAgreementAccepted = useRef(false);
  const [loading, setLoading] = useState(false);
  const buttonDisabled =
    !scriptLoaded || !tossInitialized || !tossWidgets.current || loading;

  const loadUserId = useCallback(async () => {
    try {
      const res = await getUser();
      return res.userId;
    } catch (error) {
      console.error('사용자 정보 로딩 실패:', error);
      logout();
    }
  }, []);

  const initializeTossPayments = useCallback(async () => {
    try {
      const userId = await loadUserId();

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
      tossWidgets.current = widgets;

      const finalPrice = getValues('finalPrice');
      if (!finalPrice) {
        throw new CustomError(400, '최종 가격이 존재하지 않습니다..');
      }

      const [agreementWidget] = await Promise.all([
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
        widgets.setAmount({
          value: finalPrice,
          currency: 'KRW',
        }),
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
      ]);

      agreementWidget.on('agreementStatusChange', (agreementStatus) => {
        if (agreementStatus.agreedRequiredTerms) {
          isAgreementAccepted.current = true;
        } else {
          isAgreementAccepted.current = false;
        }
      });

      setTossInitialized(true);
    } catch (e) {
      const error = e as CustomError;
      console.error(error);
      toast.error('잠시 후 다시 시도해 주세요.');
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initializeTossPayments();
    }
  }, [scriptLoaded]);

  const finalPrice = useWatch({
    control,
    name: 'finalPrice',
  });

  useEffect(() => {
    if (!tossWidgets.current) {
      return;
    }
    tossWidgets.current.setAmount({
      currency: 'KRW',
      value: finalPrice,
    });
  }, [finalPrice, tossWidgets]);

  const handlePayment = async () => {
    if (!tossWidgets.current) {
      return;
    }
    if (!isAgreementAccepted.current) {
      toast.error('이용약관에 동의해주세요.');
      return;
    }

    try {
      setLoading(true);
      const formValues = getValues();
      if (!formValues.shuttleRoute || !formValues.type) {
        throw new CustomError(400, '예약 정보가 존재하지 않습니다.');
      }
      const parsedFormValues = {
        shuttleRouteId: formValues.shuttleRoute.shuttleRouteId,
        type: formValues.type,
        toDestinationShuttleRouteHubId:
          formValues.hub.toDestinationHub?.shuttleRouteHubId,
        fromDestinationShuttleRouteHubId:
          formValues.hub.fromDestinationHub?.shuttleRouteHubId,
        isSupportingHandy: formValues.isSupportingHandy,
        passengerCount: formValues.passengerCount,
      };
      const postReservationResponse =
        await postReserveReservation(parsedFormValues);

      const readyPaymentFormValues = {
        reservationId: postReservationResponse.reservationId,
        issuedCouponId: formValues.issuedCouponId ?? null,
      };
      const readyPaymentResponse = await postPreparePayment(
        readyPaymentFormValues,
      );

      const successUrl =
        window.location.origin +
        pathname +
        `/payments?reservationId=${postReservationResponse.reservationId}`;
      const failUrl = window.location.origin + pathname + `/payments/fail`;
      const orderName =
        `[${formValues.shuttleRoute.name}] ${formValues.shuttleRoute.event.eventName}`.slice(
          0,
          99,
        );

      await tossWidgets.current.requestPayment({
        orderId: readyPaymentResponse.paymentId,
        orderName,
        successUrl,
        failUrl,
      });
    } catch (e) {
      console.error(e);
      if (!(e instanceof CustomError)) {
        return;
      }
      if (e.statusCode === 403) {
        toast.error('예약이 마감되었어요.');
        return;
      }
      toast.error('잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div id="payment-method"></div>
        <div id="agreement"></div>
      </section>
      <BottomBar
        handlePayment={handlePayment}
        handlePrevStep={handlePrevStep}
        disabled={buttonDisabled}
      />
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onReady={() => setScriptLoaded(true)}
        strategy="afterInteractive"
      />
    </>
  );
};

export default TossPayments;

interface BottomBarProps {
  handlePayment: () => void;
  handlePrevStep: () => void;
  disabled: boolean;
}

const BottomBar = ({
  handlePayment,
  handlePrevStep,
  disabled,
}: BottomBarProps) => {
  const { control } = useFormContext<ReservationFormValues>();
  const finalPrice = useWatch({
    control,
    name: 'finalPrice',
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto grid max-w-500 grid-cols-[76px_1fr] gap-8 bg-white px-16 py-8 shadow-bottomBar">
      <Button type="button" variant="secondary" onClick={handlePrevStep}>
        이전
      </Button>
      <Button type="button" disabled={disabled} onClick={handlePayment}>
        {finalPrice.toLocaleString()}원 결제하기
      </Button>
    </div>
  );
};
