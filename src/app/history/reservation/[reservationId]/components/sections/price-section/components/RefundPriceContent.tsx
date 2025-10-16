import { PaymentsViewEntity } from '@/types/payment.type';
import RefundRequestList from './RefundRequestList';

interface Props {
  payment: PaymentsViewEntity;
}

const RefundPriceContent = ({ payment }: Props) => {
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
    </div>
  );
};

export default RefundPriceContent;
