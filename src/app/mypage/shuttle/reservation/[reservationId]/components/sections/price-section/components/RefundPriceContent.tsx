import {
  PaymentsViewEntity,
  RefundRequestsInPaymentsViewEntity,
} from '@/types/payment.type';
import ArrowDownwardTipRightIcon from '../icons/arrow-downward-tip-right.svg';
import { dateString } from '@/utils/dateString.util';

interface Props {
  payment: PaymentsViewEntity;
  refundRequest: RefundRequestsInPaymentsViewEntity;
}

const RefundPriceContent = ({ payment, refundRequest }: Props) => {
  const paymentAmount = payment.paymentAmount;
  const refundAmount = refundRequest.refundAmount;
  const refundFee = paymentAmount - refundAmount;

  const refundAcceptedAt = dateString(refundRequest.refundAt, {
    showYear: true,
    showDate: true,
    showWeekday: false,
    showTime: true,
  });

  return (
    <div className="flex flex-col gap-8">
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="text-14 font-600">결제 취소</span>
        <span className="text-14 font-600">
          {paymentAmount.toLocaleString()}원
        </span>
      </li>
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-red-300">
          <ArrowDownwardTipRightIcon />
          취소 수수료
        </span>
        <span className="text-14 font-400 text-basic-red-300">
          {refundFee.toLocaleString()}원
        </span>
      </li>
      <div className="my-16 h-[1px] w-full bg-basic-grey-100" />
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="text-14 font-600">환불 총액</span>
        <span className="text-14 font-600 text-basic-red-400">
          {refundAmount.toLocaleString()}원
        </span>
      </li>
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
          <ArrowDownwardTipRightIcon />
          환불 일시 | {refundAcceptedAt}
        </span>
      </li>
    </div>
  );
};

export default RefundPriceContent;
