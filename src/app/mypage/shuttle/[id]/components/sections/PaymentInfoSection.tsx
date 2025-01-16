import Section from '../Section';

interface Props {
  price: number;
  discount: number;
  finalPrice: number;
  passengerCount: number;
}

const PaymentInfoSection = ({
  price,
  discount,
  finalPrice,
  passengerCount,
}: Props) => {
  const singlePrice = price / passengerCount;
  return (
    <Section title="결제 정보">
      <div className="flex w-full gap-4 pb-8">
        <div>예약 금액</div>
        <div className="grow text-right">
          <span className="block leading-[24px]">
            {price.toLocaleString()}원
          </span>
          <span className="block text-12 leading-[160%]">
            {singlePrice.toLocaleString()}원 * {passengerCount}인
          </span>
        </div>
      </div>
      <div className="flex w-full gap-4 pb-24">
        <div>할인 금액</div>
        <div className="grow text-right">- {discount.toLocaleString()}원</div>
      </div>
      <div className="flex w-full gap-4">
        <div className="text-18">최종 결제 금액</div>
        <div className="grow text-right text-22 font-600">
          {finalPrice.toLocaleString()}원
        </div>
      </div>
    </Section>
  );
};

export default PaymentInfoSection;
