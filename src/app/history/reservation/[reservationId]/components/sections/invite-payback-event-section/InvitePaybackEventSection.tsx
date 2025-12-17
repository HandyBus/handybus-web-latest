'use client';

import Button from '@/components/buttons/button/Button';
import WrapperWithDivider from '../../WrapperWithDivider';
import PaybackTable from './PaybackTable';
import { ReferralsViewEntity } from '@/types/referral.type';
import ProgressBar from './ProgressBar';
import { PaymentsViewEntity } from '@/types/payment.type';
import { EventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useInvitePayback } from './hooks/useInvitePayback';

interface Props {
  referral: ReferralsViewEntity | null;
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  passengerCount: number;
}

const InvitePaybackEventSection = ({
  referral,
  event,
  reservation,
  payment,
  passengerCount,
}: Props) => {
  const { calculation, handleShareReferralCode } = useInvitePayback({
    referral,
    event,
    reservation,
    payment,
    passengerCount,
  });

  if (!calculation) {
    return null;
  }

  const {
    percentage,
    remainingAmount,
    refundAmount,
    nextInviteScalingDiscount,
    inviteCount,
  } = calculation;

  return (
    <WrapperWithDivider>
      <section className="flex flex-col gap-16 px-16 py-24">
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-16 font-600">친구 초대하기</h3>
          <p className="text-14 font-500 leading-[160%]">
            함께 할수록, 더 저렴하게 이용해요. <br />
            누적되는 금액으로 총{' '}
            <span className="text-brand-primary-400">100%</span>까지 돌려받을 수
            있어요.
          </p>
        </div>
        <PaybackTable event={event} reservation={reservation} />
        <ProgressBar
          percentage={percentage}
          remainingAmount={remainingAmount}
          refundAmount={refundAmount}
          nextInviteScalingDiscount={nextInviteScalingDiscount}
          acceptedCount={inviteCount}
        />
        <Button onClick={handleShareReferralCode}>초대 링크 공유하기</Button>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
          * 초대 링크를 통해 예약을 완료한 예약 건을 기준으로 환급 금액이
          누적됩니다.
          <br />
          * 예약한 사람에게는 건 당 일괄 1,000원 할인이 적용됩니다.
          <br />
          * 초대 링크를 통한 예약은 1인 1회 동일 행사에 대해서만 가능하며, 예약
          취소 후 동일 링크로 재예약 시 할인이 다시 적용됩니다.
          <br />
          * 환급 금액은 행사일 이후, 영업일 기준 4일 안에 지급됩니다.
          <br />
          * 링크를 받은 친구도 본인의 링크를 다시 공유하여 추가 할인을 받을 수
          있습니다.
          <br />
          * 초대 링크를 통한 결제 시, 친구 전용 링크 안내를 확인해 주세요. 전용
          링크 표시가 없는 경우, 할인이 적용되지 않습니다.
          <br />
          * 최대 환급 금액은 탑승권 1인 기준 예약 금액의 100%이며, 초과 시 추가
          환급은 적용되지 않습니다.
          <br />* 할인을 적용하여 예매한 경우, 할인 적용 금액은 최대 환급
          금액에서 제외됩니다. 2인 이상 예매 시, 할인 금액은 예약 인원으로 나눠
          최대 환급 금액에서 제외됩니다.
        </p>
      </section>
    </WrapperWithDivider>
  );
};

export default InvitePaybackEventSection;
