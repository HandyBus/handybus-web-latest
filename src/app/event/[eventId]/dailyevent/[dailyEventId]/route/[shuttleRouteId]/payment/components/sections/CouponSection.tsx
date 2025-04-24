import Section from '../Section';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import RadioCheckedIcon from '../../icons/radio-checked.svg';
import RadioUncheckedIcon from '../../icons/radio-unchecked.svg';
import dayjs from 'dayjs';

interface Props {
  coupons: IssuedCouponsViewEntity[];
  selectedCoupon: IssuedCouponsViewEntity | null;
  setSelectedCoupon: (coupon: IssuedCouponsViewEntity | null) => void;
}

const CouponSection = ({
  coupons,
  selectedCoupon,
  setSelectedCoupon,
}: Props) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [stagedSelectedCoupon, setStagedSelectedCoupon] =
    useState<IssuedCouponsViewEntity | null>(null);

  const couponCount = coupons.length;

  return (
    <>
      <Section heading="쿠폰">
        <button
          type="button"
          onClick={() => setIsCouponModalOpen(true)}
          disabled={couponCount === 0}
          className="group flex h-[46px] w-full items-center justify-between gap-4 rounded-8 border border-basic-grey-200 p-12 disabled:text-basic-grey-300"
        >
          {selectedCoupon ? (
            <p className="text-black text-14 font-600">
              [{selectedCoupon.name}]{' '}
              {selectedCoupon.discountType === 'RATE'
                ? `${selectedCoupon.discountRate}%`
                : `${selectedCoupon.discountAmount?.toLocaleString()}원`}{' '}
              할인
            </p>
          ) : (
            <>
              {couponCount > 0 ? (
                <p className="text-black text-14 font-600">
                  사용 가능한 쿠폰이{' '}
                  <span className="text-brand-primary-400">{couponCount}</span>
                  장 있어요!
                </p>
              ) : (
                <p className="text-14 font-600 text-basic-grey-300">
                  사용 가능한 쿠폰이 없어요.
                </p>
              )}
            </>
          )}
          <span className="text-basic-grey-500 group-disabled:bg-basic-grey-50">
            <ArrowRightIcon />
          </span>
        </button>
      </Section>
      <Modal
        isOpen={isCouponModalOpen}
        closeModal={() => setIsCouponModalOpen(false)}
        title="쿠폰을 선택하세요"
        primaryButton={{
          variant: 'primary',
          text: '확인',
          onClick: () => {
            setIsCouponModalOpen(false);
            setSelectedCoupon(stagedSelectedCoupon);
          },
        }}
        secondaryButton={{
          variant: 'tertiary',
          text: '취소',
          onClick: () => {
            setIsCouponModalOpen(false);
            setStagedSelectedCoupon(null);
          },
        }}
      >
        <ul className="flex flex-col gap-24 py-12">
          <button
            type="button"
            onClick={() => setStagedSelectedCoupon(null)}
            className="flex gap-[6px] text-left"
          >
            <div>
              {stagedSelectedCoupon === null ? (
                <RadioCheckedIcon />
              ) : (
                <RadioUncheckedIcon />
              )}
            </div>
            <div className="text-14 font-600 text-basic-grey-700">
              쿠폰 적용 안함
            </div>
          </button>
          {coupons.map((coupon) => {
            const formattedValidTo = dayjs(coupon.validTo)
              .subtract(1, 'minute')
              .format('YYYY년 M월 D일 H시 m분');
            return (
              <button
                key={coupon.issuedCouponId}
                type="button"
                onClick={() => setStagedSelectedCoupon(coupon)}
                className="flex gap-[6px] text-left"
              >
                <div>
                  {stagedSelectedCoupon?.issuedCouponId ===
                  coupon.issuedCouponId ? (
                    <RadioCheckedIcon />
                  ) : (
                    <RadioUncheckedIcon />
                  )}
                </div>
                <div>
                  <p className="text-14 font-600">
                    [{coupon.name}]{' '}
                    {coupon.discountType === 'RATE'
                      ? `${coupon.discountRate}%`
                      : `${coupon.discountAmount?.toLocaleString()}원`}{' '}
                    할인
                  </p>
                  {coupon.maxDiscountAmount ? (
                    <p className="text-12 font-500 text-basic-grey-700">
                      최대 {coupon.maxDiscountAmount?.toLocaleString()}원 할인
                    </p>
                  ) : null}
                  {coupon.maxApplicablePeople ? (
                    <p className="text-12 font-500 text-basic-grey-700">
                      예약 당 최대 {coupon.maxApplicablePeople}인 적용
                    </p>
                  ) : null}
                  <p className="text-12 font-500 text-basic-grey-500">
                    {formattedValidTo}까지
                  </p>
                </div>
              </button>
            );
          })}
        </ul>
      </Modal>
    </>
  );
};

export default CouponSection;
