import Section from '../Section';
import ArrowDownwardTipRightIcon from '../../icons/arrow-downward-tip-right.svg';

const PriceSection = () => {
  return (
    <Section heading="결제 금액">
      <div className="flex flex-col gap-8">
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="text-14 font-600">가는 편</span>
          <span className="text-14 font-600">32,000원</span>
        </li>
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="flex items-center gap-4 text-14 font-400 text-basic-grey-500">
            <ArrowDownwardTipRightIcon />
            1매
          </span>
          <span className="text-14 font-400 text-basic-grey-500">
            32,000원 x 1
          </span>
        </li>
        <li className="flex h-[22px] w-full items-center justify-between">
          <span className="text-14 font-600">쿠폰 할인</span>
          <span className="text-14 font-600">-10,000원</span>
        </li>
      </div>
      <div className="h-[1px] w-full bg-basic-grey-100" />
      <div className="flex h-[30px] w-full items-center justify-between">
        <span className="text-16 font-600">최종 결제 금액</span>
        <span className="text-18 font-600">22,000원</span>
      </div>
    </Section>
  );
};

export default PriceSection;
