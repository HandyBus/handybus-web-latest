import Section from '../Section';
import ArrowRightIcon from '../../icons/arrow-right.svg';

const CouponSection = () => {
  return (
    <Section heading="쿠폰">
      <button
        type="button"
        className="flex h-[46px] w-full items-center justify-between gap-4 rounded-8 border border-basic-grey-200 p-12"
      >
        <p className="text-14 font-600">
          사용 가능한 쿠폰이 <span className="text-brand-primary-400">1</span>장
          있어요!
        </p>
        <ArrowRightIcon />
      </button>
    </Section>
  );
};

export default CouponSection;
