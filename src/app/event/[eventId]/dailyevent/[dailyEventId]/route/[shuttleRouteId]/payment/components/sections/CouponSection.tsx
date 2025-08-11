import Section from '../Section';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import RadioCheckedIcon from '../../icons/radio-checked.svg';
import RadioUncheckedIcon from '../../icons/radio-unchecked.svg';
import RadioDisabledIcon from '../../icons/radio-disabled.svg';
import dayjs from 'dayjs';
import { useGetEvent } from '@/services/event.service';

interface Props {
  eventId: string;
  coupons: IssuedCouponsViewEntity[];
  selectedCoupon: IssuedCouponsViewEntity | null;
  setSelectedCoupon: (coupon: IssuedCouponsViewEntity | null) => void;
}

const CouponSection = ({
  eventId,
  coupons,
  selectedCoupon,
  setSelectedCoupon,
}: Props) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [stagedSelectedCoupon, setStagedSelectedCoupon] =
    useState<IssuedCouponsViewEntity | null>(null);

  const allowedCouponsForEvent = coupons.filter((coupon) => {
    if (coupon.allowedEventId === null) {
      return true;
    }
    return coupon.allowedEventId === eventId;
  });
  const notAllowedCouponsForEvent = coupons.filter((coupon) => {
    if (coupon.allowedEventId === null) {
      return false;
    }
    return coupon.allowedEventId !== eventId;
  });

  const allowedCouponsForEventCount = allowedCouponsForEvent.length;

  return (
    <>
      <Section heading="쿠폰">
        <button
          type="button"
          onClick={() => setIsCouponModalOpen(true)}
          disabled={allowedCouponsForEventCount === 0}
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
              {allowedCouponsForEventCount > 0 ? (
                <p className="text-black text-14 font-600">
                  사용 가능한 쿠폰이{' '}
                  <span className="text-brand-primary-400">
                    {allowedCouponsForEventCount}
                  </span>
                  장 있어요!
                </p>
              ) : (
                <p className="text-14 font-600 text-basic-grey-300">
                  사용 가능한 쿠폰이 없어요.
                </p>
              )}
            </>
          )}
          <span className="text-basic-grey-500 ">
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
        <ul className="flex max-h-[300px] flex-col gap-24 overflow-y-auto py-12">
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
          {allowedCouponsForEvent.map((coupon) => (
            <Coupon
              key={coupon.issuedCouponId}
              coupon={coupon}
              onClick={setStagedSelectedCoupon}
              selected={
                stagedSelectedCoupon?.issuedCouponId === coupon.issuedCouponId
              }
              disabled={false}
            />
          ))}
          {notAllowedCouponsForEvent.map((coupon) => (
            <Coupon
              key={coupon.issuedCouponId}
              coupon={coupon}
              onClick={setStagedSelectedCoupon}
              selected={
                stagedSelectedCoupon?.issuedCouponId === coupon.issuedCouponId
              }
              disabled={true}
            />
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default CouponSection;

interface CouponProps {
  coupon: IssuedCouponsViewEntity;
  onClick: (coupon: IssuedCouponsViewEntity) => void;
  selected: boolean;
  disabled: boolean;
}

const Coupon = ({ coupon, onClick, selected, disabled }: CouponProps) => {
  const title =
    coupon.discountType === 'RATE'
      ? `${coupon.discountRate}%`
      : `${coupon.discountAmount?.toLocaleString()}원`;
  const formattedValidTo = dayjs(coupon.validTo)
    .subtract(1, 'minute')
    .format('YYYY년 M월 D일 H시 m분');

  const { data: allowedEvent } = useGetEvent(coupon.allowedEventId ?? '', {
    enabled: !!coupon.allowedEventId,
  });

  const allowedEventIdText = !coupon.allowedEventId
    ? '모든 행사에 사용 가능한 쿠폰'
    : allowedEvent
      ? `${allowedEvent.eventName} 쿠폰`
      : ' ';

  const maxApplicablePeopleText =
    coupon.maxApplicablePeople === 0
      ? '예약 당 인원 제한 없음'
      : `예약 당 최대 ${coupon.maxApplicablePeople}인 적용`;

  return (
    <button
      type="button"
      onClick={() => onClick(coupon)}
      disabled={disabled}
      className="group flex gap-[6px] rounded-4 text-left"
    >
      <div>
        {disabled ? (
          <RadioDisabledIcon />
        ) : selected ? (
          <RadioCheckedIcon />
        ) : (
          <RadioUncheckedIcon />
        )}
      </div>
      <div>
        <p className="text-14 font-600 group-disabled:text-basic-grey-300">
          {`[${coupon.name}] ${title} 할인`}
        </p>
        {coupon.discountType === 'RATE' && (
          <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
            최대 {coupon.maxDiscountAmount?.toLocaleString()}원 할인
          </p>
        )}
        <p className="line-clamp-1 h-[19px] text-12 font-500 leading-[160%] text-basic-grey-700 group-disabled:text-basic-grey-300">
          {allowedEventIdText}
        </p>
        <p className="line-clamp-1 h-[19px] text-12 font-500 leading-[160%] text-basic-grey-700 group-disabled:text-basic-grey-300">
          {maxApplicablePeopleText}
        </p>
        <p className="text-12 font-500 text-basic-grey-500 group-disabled:text-basic-grey-300">
          {formattedValidTo}까지
        </p>
        {disabled && (
          <p className="text-12 font-500 leading-[160%] text-basic-red-400">
            적용 가능한 행사가 아닙니다.
          </p>
        )}
      </div>
    </button>
  );
};
