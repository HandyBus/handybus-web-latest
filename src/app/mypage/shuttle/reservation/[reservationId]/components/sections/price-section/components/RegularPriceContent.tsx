import { PaymentsViewEntity } from '@/types/payment.type';
import ArrowDownwardTipRightIcon from '../icons/arrow-downward-tip-right.svg';
import { dateString } from '@/utils/dateString.util';
import RefundRequestList from './RefundRequestList';

interface Props {
  payment: PaymentsViewEntity;
  passengerCount: number;
  isHandySupported: boolean;
}

const RegularPriceContent = ({
  payment,
  passengerCount,
  isHandySupported,
}: Props) => {
  const paymentAmount = payment.paymentAmount;
  const regularPrice = payment.principalAmount / passengerCount;
  const totalEarlybirdDiscountAmount = payment.earlybirdDiscountAmount;
  const totalCouponDiscountAmount = payment.couponDiscountAmount;
  const hasRefundRequests =
    payment?.refundRequests && payment.refundRequests.length > 0;

  const paymentAt = dateString(payment.createdAt, {
    showYear: true,
    showDate: true,
    showWeekday: false,
    showTime: true,
  });

  return (
    <div className="flex flex-col gap-8">
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="text-14 font-600">
          결제 {hasRefundRequests ? '총액' : '금액'}
        </span>
        <span
          className={`text-14 font-600 ${
            !hasRefundRequests && 'text-brand-primary-400'
          }`}
        >
          {paymentAmount.toLocaleString()}원
        </span>
      </li>
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
          <ArrowDownwardTipRightIcon />
          {passengerCount}매
        </span>
        <span className="text-14 font-400 text-basic-grey-500">
          {regularPrice.toLocaleString()}원 x {passengerCount}
        </span>
      </li>
      {totalEarlybirdDiscountAmount > 0 && (
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
            <ArrowDownwardTipRightIcon />
            얼리버드 할인
          </span>
          <span className="text-14 font-400 text-basic-grey-500">
            -{totalEarlybirdDiscountAmount.toLocaleString()}원
          </span>
        </li>
      )}
      {totalCouponDiscountAmount > 0 && (
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
            <ArrowDownwardTipRightIcon />
            쿠폰 할인
          </span>
          <span className="text-14 font-400 text-basic-grey-500">
            -{totalCouponDiscountAmount.toLocaleString()}원
          </span>
        </li>
      )}
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
          <ArrowDownwardTipRightIcon />
          결제 일시 | {paymentAt}
        </span>
      </li>
      {isHandySupported && (
        <div className="rounded-8 bg-basic-grey-50 p-8 text-12 font-500 text-basic-grey-500">
          핸디 지원금은 결제 금액의 50%이며, 선정된 핸디에 한해 셔틀 종료 후
          환급됩니다. (영업일 기준 3일 이내) 결제 단계에서 할인이 적용되지
          않습니다.
        </div>
      )}
      <RefundRequestList refundRequests={payment.refundRequests} />
    </div>
  );
};

export default RegularPriceContent;
