'use client';

import Script from 'next/script';

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
          successUrl: string;
          failUrl: string;
          customerEmail: string;
          customerName: string;
          customerMobilePhone: string;
        }) => void;
      };
    };
  }
}

const TossPayment = () => {
  const initializeTossPayments = () => {
    try {
      if (typeof window.TossPayments === 'undefined') {
        throw new Error('TossPayments SDK가 로드되지 않았습니다.');
      }
      const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
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
        await widgets.requestPayment({
          orderId: '7U-ZVWAkky6YgB2csrdi0',
          orderName: '토스 티셔츠 외 2건',
          successUrl: window.location.origin + '/success.html',
          failUrl: window.location.origin + '/fail.html',
          customerEmail: 'customer123@gmail.com',
          customerName: '김토스',
          customerMobilePhone: '01012341234',
        });
      });
    } catch (error) {
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
        <button id="payment-button">결제하기</button>
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
