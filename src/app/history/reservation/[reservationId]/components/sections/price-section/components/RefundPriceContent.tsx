import { PaymentsViewEntity } from '@/types/payment.type';
import RefundRequestList from './RefundRequestList';

interface Props {
  payment: PaymentsViewEntity;
  isTransferredReservation: boolean;
}

const RefundPriceContent = ({ payment, isTransferredReservation }: Props) => {
  const paymentAmount = payment.paymentAmount;

  return (
    <div className="flex flex-col gap-8">
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="text-14 font-600">결제 총액</span>
        <span className="text-14 font-600">
          {paymentAmount.toLocaleString()}원
        </span>
      </li>
      <RefundRequestList
        refundRequests={payment.refundRequests}
        isCanceled={true}
      />
      {isTransferredReservation && (
        <p className="mt-8 text-14 font-400 leading-[160%] text-basic-grey-500">
          환불 총액은 발송인에게 자동으로 환불됩니다.
        </p>
      )}
    </div>
  );
};

export default RefundPriceContent;
