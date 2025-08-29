'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomError } from '@/services/custom-error';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

export const PAYMENT_METHODS_ID = 'payment-method';
export const AGREEMENT_ID = 'agreement';

declare global {
  interface Window {
    TossPayments: new (clientKey: string) => {
      widgets: (options: { customerKey: string }) => TossPaymentsWidgets;
    };
  }
}

interface Props {
  userId: string;
  initialPrice: number;
}

const useTossPayments = ({ userId, initialPrice }: Props) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [tossInitialized, setTossInitialized] = useState(false);
  const tossWidgets = useRef<TossPaymentsWidgets | null>(null);
  // NOTE: 토스 개발자 센터에서 약관의 초기값을 '동의'로 설정함
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(true);
  const [paymentRequestLoading, setPaymentRequestLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const newIsDisabled =
      !scriptLoaded ||
      !tossInitialized ||
      !isAgreementAccepted ||
      paymentRequestLoading;
    setIsDisabled(newIsDisabled);
  }, [
    scriptLoaded,
    tossInitialized,
    isAgreementAccepted,
    paymentRequestLoading,
  ]);

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
      const customerKey = await generateCustomerKey(userId);
      const widgets = tossPayments.widgets({
        customerKey: customerKey,
      });
      tossWidgets.current = widgets;

      const [agreementWidget] = await Promise.all([
        widgets.renderAgreement({
          selector: generateSelector(AGREEMENT_ID),
          variantKey: 'AGREEMENT',
        }),
        widgets.setAmount({
          value: initialPrice,
          currency: 'KRW',
        }),
        widgets.renderPaymentMethods({
          selector: generateSelector(PAYMENT_METHODS_ID),
          variantKey: 'DEFAULT',
        }),
      ]);

      agreementWidget.on('agreementStatusChange', (agreementStatus) => {
        if (agreementStatus.agreedRequiredTerms) {
          setIsAgreementAccepted(true);
        } else {
          setIsAgreementAccepted(false);
        }
      });

      setTossInitialized(true);
    } catch (e) {
      const error = e as CustomError;
      Sentry.captureException(error, {
        tags: {
          component: 'TossPayments',
          feature: 'payment',
          paymentMethod: 'toss',
          paymentType: 'initialization',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          userId,
          initialPrice,
          clientKey: process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY
            ? 'configured'
            : 'missing',
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);
      toast.error('잠시 후 다시 시도해 주세요.');
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initializeTossPayments();
    }
  }, [scriptLoaded]);

  // 결제 요청
  const requestPayment = async ({
    orderId,
    orderName,
    successUrl,
    failUrl,
    onError,
    markAsIntentionalNavigation,
  }: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    onError?: (error: CustomError) => void;
    markAsIntentionalNavigation?: (hasNoTimeout: boolean) => void;
  }) => {
    if (!tossWidgets.current) {
      return;
    }
    setPaymentRequestLoading(true);

    try {
      markAsIntentionalNavigation?.(true);
      await tossWidgets.current.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
      });
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          component: 'TossPayments',
          feature: 'payment',
          paymentMethod: 'toss',
          paymentType: 'request',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          orderId,
          orderName,
          successUrl,
          failUrl,
          isDisabled,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(e);
      if (!(e instanceof CustomError)) {
        return;
      }
      onError?.(e);
    } finally {
      setPaymentRequestLoading(false);
    }
  };

  // 결제 금액 변경
  const changePrice = useCallback(
    (price: number) => {
      if (!tossWidgets.current) {
        return;
      }
      tossWidgets.current.setAmount({
        currency: 'KRW',
        value: price,
      });
    },
    [tossWidgets],
  );

  const TossPaymentsScript = () => {
    return (
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onReady={() => setScriptLoaded(true)}
        strategy="afterInteractive"
      />
    );
  };

  return {
    TossPaymentsScript,
    isDisabled,
    requestPayment,
    changePrice,
  };
};

export default useTossPayments;

export const generateCustomerKey = async (userId: string): Promise<string> => {
  return `USER_${userId}`;
};

export const generateSelector = (id: string) => {
  return `#${id}`;
};
