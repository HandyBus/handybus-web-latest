import Section from '../Section';
import ArrowDownwardTipRightIcon from '../../icons/arrow-downward-tip-right.svg';

interface Props {
  regularPrice: number;
  finalPrice: number;
  totalCouponDiscountAmount: number;
  totalEarlybirdDiscountAmount: number;
  passengerCount: number;
}

const PriceSection = ({
  regularPrice,
  finalPrice,
  totalCouponDiscountAmount,
  totalEarlybirdDiscountAmount,
  passengerCount,
}: Props) => {
  return (
    <Section heading="결제 금액">
      <div className="flex flex-col gap-8">
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="text-14 font-600">가는 편</span>
          <span className="text-14 font-600">
            {regularPrice.toLocaleString()}원
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
            <span className="text-14 font-600">얼리버드 할인</span>
            <span className="text-14 font-600">
              -{totalEarlybirdDiscountAmount.toLocaleString()}원
            </span>
          </li>
        )}
        {totalCouponDiscountAmount > 0 && (
          <li className="flex h-[22px] w-full items-center justify-between">
            <span className="text-14 font-600">쿠폰 할인</span>
            <span className="text-14 font-600">
              -{totalCouponDiscountAmount.toLocaleString()}원
            </span>
          </li>
        )}
      </div>
      <div className="h-[1px] w-full bg-basic-grey-100" />
      <div className="flex h-[30px] w-full items-center justify-between">
        <span className="text-16 font-600">최종 결제 금액</span>
        <span className="text-18 font-600">
          {finalPrice.toLocaleString()}원
        </span>
      </div>
    </Section>
  );
};

export default PriceSection;
