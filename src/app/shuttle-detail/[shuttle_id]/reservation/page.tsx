'use client';

import { RefObject, useState } from 'react';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import { BannerImage } from '../demand-request/page';
import Select from '@/components/select/Select';
import { BIG_REGIONS } from '@/constants/regions';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import NoticeSection, { NOTICE_TYPE } from '../components/NoticeSection';
import PassengerCount from '../../utils/PassengerCount';
import { SECTION } from '@/types/shuttle.types';
import TextInput from '@/components/inputs/text-input/TextInput';
import { Control, FieldValues, useForm } from 'react-hook-form';
import BottomBar from '../components/BottomBar';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import useBottomSheet from '@/hooks/useBottomSheet';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import EmptyCouponIcon from '/public/icons/empty-coupon.svg';
import DeleteIcon from '/public/icons/x.svg';
import LogoLargeIcon from '/public/icons/logo-large.svg';
import useFunnel from '@/hooks/useFunnel';

const ShuttleReservation = () => {
  const [count, setCount] = useState<number>(0);
  const ready = true;
  const { control } = useForm();
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel([
    1, 2, 3, 4,
  ]);

  return (
    <main>
      <Funnel>
        <Step name={1}>
          <ProgressBar numerator={1} denominator={4} />
          <section>
            <BannerImage />
            <ShuttleInfo />
            {ready ? (
              <>
                <div id="divider" className="my-16 h-[8px] bg-grey-50" />
                <ShuttleRouteVisualizer
                  object={[]}
                  section={SECTION.MY_RESERVATION}
                />
                <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
                <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
              </>
            ) : null}
          </section>
          <BottomBar
            message="예약하기"
            forReservation={true}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name={2}>
          <ProgressBar numerator={2} denominator={4} />
          <section>
            <BannerImage />
            <PassengerCount count={count} setCount={setCount} />
            {Array.from({ length: count }).map((_, index) => (
              <section
                key={index}
                className="flex flex-col gap-[16px] px-16 py-28"
              >
                <h2 className="text-18 font-500 leading-[22.8px]">
                  탑승객 정보를 입력해주세요
                </h2>
                <TextInput
                  version="shuttle"
                  name={`passenger-${index}`}
                  setValue={() => {}}
                  control={control}
                  placeholder="이름을 입력해주세요"
                >
                  <h3 className="text-12 font-500 leading-[19.2px]">
                    탑승객 정보
                  </h3>
                </TextInput>
                <TextInput
                  version="shuttle"
                  name={`passenger-${index}`}
                  setValue={() => {}}
                  control={control}
                  placeholder="휴대전화번호를 입력해주세요 (‘-’ 제외)"
                >
                  <h3 className="text-12 font-500 leading-[19.2px]">
                    휴대전화번호
                  </h3>
                </TextInput>
              </section>
            ))}
          </section>
          <BottomBar
            message="예약하기"
            forReservation={true}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name={3}>
          <ProgressBar numerator={3} denominator={4} />
          <section>
            <BannerImage />
            <ReservationInfo />
            <div className="h-[8px] bg-grey-50" />
            <PassengerInfo />
            <div className="h-[8px] bg-grey-50" />
            <ApplyHandy />
            <div className="h-[8px] bg-grey-50" />
            <TotalPriceInfo />
            <div className="h-[8px] bg-grey-50" />
            <TossPayment />
          </section>
          <BottomBar
            message="예약하기"
            forReservation={true}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name={4}>
          <ProgressBar numerator={4} denominator={4} />
          <section>
            <ReservationCompleted />
            <BannerImage />
            <ReservationInfo />
            <PassengerInfo />
            <section className="px-16 pb-24 pt-32">
              <PriceDetail />
            </section>
          </section>
          <BottomBar
            message="예약하기"
            forReservation={true}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
      </Funnel>
    </main>
  );
};

export default ShuttleReservation;

const ReservationCompleted = () => {
  return (
    <section className="flex h-[539px] flex-col items-center justify-center gap-24">
      <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
      <section>
        <h1 className="text-28 font-700 leading-[39.2px] text-black">
          예약이 완료되었어요
        </h1>
        <p className="text-16 font-500 leading-[25.6px] text-grey-500">
          핸디버스와 함께 콘서트 갈 준비 완료!
        </p>
      </section>
    </section>
  );
};

const ApplyHandy = () => {
  return (
    <section className="flex flex-col gap-12 px-16 py-32">
      <section>
        <h3 className="text-22 font-700 leading-[30.8px] text-grey-900">
          핸디 지원하기
        </h3>
        <p className="text-14 font-500 leading-[22.4px] text-grey-500">
          안전한 운행을 도와주면, 다음 이용료가 절반!
        </p>
      </section>
      <section className="flex gap-8">
        <Button variant="handyCancel" className="w-[122px]">
          안 할래요
        </Button>
        <Button variant="secondary" className="w-[136px]">
          지원 할래요
        </Button>
      </section>
      <p className="text-12 font-500 leading-[19.2px] text-grey-700 underline">
        핸디역할 알아보기
      </p>
    </section>
  );
};

const TossPayment = () => {
  return <section className="h-[354px] bg-primary-400">TOSS PAYMENTS</section>;
};

const TotalPriceInfo = () => {
  const couponCount = 1;
  const isCouponSelected = false;
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();
  const { control } = useForm();

  return (
    <>
      <section className="flex flex-col gap-[16px] px-16 py-32">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          할인 쿠폰이 있으신가요?
        </h2>
        {isCouponSelected ? (
          <SelectedCoupon />
        ) : (
          <RedirectButton
            description="핸디버스를 더 합리적으로 만날 수 있어요"
            onClick={openBottomSheet}
          >
            <p>쿠폰 사용하기</p>
          </RedirectButton>
        )}
        <PriceDetail />
      </section>
      <CouponSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        control={control}
        couponCount={couponCount}
      />
    </>
  );
};

const CouponSheet = ({
  bottomSheetRef,
  contentRef,
  control,
  couponCount,
}: {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
  control: Control<FieldValues, undefined>;
  couponCount: number;
}) => {
  return (
    <BottomSheet ref={bottomSheetRef} title="쿠폰 선택">
      <section ref={contentRef}>
        <section className="flex flex-col gap-24 py-28">
          <TextInput
            version="shuttle"
            name="coupon"
            setValue={() => {}}
            control={control}
            placeholder="쿠폰 코드를 입력해주세요"
          >
            <h3 className="pb-8 text-16 font-500 leading-[25.6px] text-grey-600-sub">
              쿠폰 코드
            </h3>
          </TextInput>
          <Button>쿠폰 등록하기</Button>
        </section>
        <div className="mx-[-32px] h-[8px] bg-grey-50" />
        <section className="flex flex-col gap-24 py-28">
          <h3 className="text-14 font-400 leading-[22.4px] text-grey-500">{`보유한 쿠폰 (${couponCount})`}</h3>
          {couponCount > 0 ? (
            Array.from({ length: couponCount }).map((_, index) => (
              <Coupon key={index} />
            ))
          ) : (
            <EmptyCoupon />
          )}
        </section>
      </section>
    </BottomSheet>
  );
};

const Coupon = () => {
  return (
    <button
      type="button"
      className="flex flex-col gap-4 rounded-[12px] bg-grey-50 p-16 text-left active:bg-grey-100"
    >
      <div>
        <p className="text-22 font-600 leading-[35.2px] text-black">50% 할인</p>
        <p className="text-16 font-500 leading-[25.6px] text-grey-800">
          핸디 감사 쿠폰 (2024-08-ATEEZ-부산)
        </p>
      </div>
      <div>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          예약 당 최대 1인 적용
        </p>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          2024. 12. 31. 23:59까지 사용 가능
        </p>
      </div>
    </button>
  );
};

const SelectedCoupon = () => {
  return (
    <section className="relative flex flex-col gap-4 rounded-[12px] bg-grey-50 p-16 text-left">
      <div>
        <p className="text-22 font-600 leading-[35.2px] text-black">50% 할인</p>
        <p className="text-16 font-500 leading-[25.6px] text-grey-800">
          핸디 감사 쿠폰 (2024-08-ATEEZ-부산)
        </p>
      </div>
      <div>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          예약 당 최대 1인 적용
        </p>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          2024. 12. 31. 23:59까지 사용 가능
        </p>
      </div>
      <button
        type="button"
        className="absolute right-[8px] top-[16px] h-[24px] w-[24px] cursor-pointer hover:opacity-70"
      >
        <DeleteIcon viewBox="0 0 8 8" width={14} height={14} />
      </button>
    </section>
  );
};

const EmptyCoupon = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-28">
      <EmptyCouponIcon viewBox="0 0 145 144" width={145} height={144} />
      <p className="text-16 font-400 leading-[24px] text-grey-300">
        쿠폰이 없어요
      </p>
    </div>
  );
};

const PriceDetail = () => {
  const isDiscounted = true;

  return (
    <dl className="flex flex-col gap-[16px]">
      <dt className="sr-only">가격 정보</dt>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-16 font-400 leading-[24px] text-grey-900">
          예약금액
        </dt>
        <div>
          <dd className="text-right text-16 font-400 leading-[24px] text-grey-900">
            30,000원
          </dd>
          <dd className="text-12 font-400 leading-[19.2px] text-grey-900">
            (42,000원 * 2인)
          </dd>
        </div>
      </div>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-16 font-400 leading-[24px] text-grey-900">
          할인금액
        </dt>
        <div>
          <dd
            className={`text-right text-16 font-400 leading-[24px] ${
              isDiscounted ? 'text-primary-main' : 'text-grey-900'
            }`}
          >
            -0원
          </dd>
          {isDiscounted && (
            <dd className="text-12 font-400 leading-[19.2px] text-primary-main">
              핸디 감사 쿠폰 (2024-08-ATEEZ-부산)
            </dd>
          )}
        </div>
      </div>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-18 font-500 leading-[28.8px] text-grey-900">
          최종 결제 금액
        </dt>
        <dd className="text-22 font-600 leading-[35.2px] text-grey-900">
          30,000원
        </dd>
      </div>
    </dl>
  );
};

const PassengerInfo = () => {
  const passengerCount = 3;
  return (
    <section className="flex flex-col gap-[32px] px-12 py-32">
      {Array.from({ length: passengerCount }).map((_, index) => (
        <div key={index} className="flex flex-col gap-[16px]">
          <h3 className="text-18 font-500 leading-[25.2px] text-grey-700">
            탑승객 {index + 1}
          </h3>
          <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
            <div className="text-16 font-400 leading-[24px] text-grey-600-sub">
              이름
            </div>
            <div className="text-16 font-400 leading-[24px] text-grey-900">
              홍길동
            </div>

            <div className="text-16 font-400 leading-[24px] text-grey-600-sub">
              전화번호
            </div>
            <div className="text-16 font-400 leading-[24px] text-grey-800">
              010-1234-5678
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const ReservationInfo = () => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        예약내역을 확인해주세요
      </h2>
      <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승일
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          2024. 07. 06. (토)
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          노선 종류
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          청주-천안
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          왕복 여부
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          편도 (귀가행)
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          하차 장소
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          청주대학교
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승객 수
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">2명</div>
      </div>
    </section>
  );
};

const ShuttleInfo = () => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        원하는 셔틀을 입력해주세요
      </h2>
      <Select
        isUnderLined={true}
        options={BIG_REGIONS}
        value=""
        setValue={() => {}}
        placeholder="탑승일"
      />
      <Select
        isUnderLined={true}
        options={[]}
        value=""
        setValue={() => {}}
        placeholder="노선 종류"
      />
      <Select
        isUnderLined={true}
        options={[]}
        value=""
        setValue={() => {}}
        placeholder="왕복/콘서트행/귀가행"
      />
    </section>
  );
};
