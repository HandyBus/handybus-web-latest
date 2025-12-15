import { PaymentsViewEntity } from '@/types/payment.type';
import ArrowDownwardTipRightIcon from '../icons/arrow-downward-tip-right.svg';
import { dateString } from '@/utils/dateString.util';
import RefundRequestList from './RefundRequestList';
import { ReferralsViewEntity } from '@/types/referral.type';

interface Props {
  payment: PaymentsViewEntity;
  passengerCount: number;
  targetReferral: ReferralsViewEntity | null;
}

const RegularPriceContent = ({
  payment,
  passengerCount,
  targetReferral,
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
      {targetReferral && (
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
            <ArrowDownwardTipRightIcon />
            초대 코드 할인
          </span>
          <span className="text-14 font-400 text-basic-grey-500">
            -{targetReferral.discountAmount.toLocaleString()}원
          </span>
        </li>
      )}
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
          <ArrowDownwardTipRightIcon />
          결제 일시 | {paymentAt}
        </span>
      </li>
      <RefundRequestList refundRequests={payment.refundRequests} />
    </div>
  );
};

export default RegularPriceContent;
