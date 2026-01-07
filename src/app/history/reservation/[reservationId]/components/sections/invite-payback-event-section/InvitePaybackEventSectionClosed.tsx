'use client';

import WrapperWithDivider from '../../WrapperWithDivider';
import { ReferralsViewEntity } from '@/types/referral.type';
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

/**
 * 친구초대 페이백 이벤트 참여자만 보여주는 이벤트 종료 및 환급금액 안내 컴포넌트
 */
const InvitePaybackEventSectionClosed = ({
  referral,
  event,
  reservation,
  payment,
  passengerCount,
}: Props) => {
  const { calculation } = useInvitePayback({
    referral,
    event,
    reservation,
    payment,
    passengerCount,
  });

  if (!calculation) {
    return null;
  }

  const { refundAmount } = calculation;

  return (
    <WrapperWithDivider>
      <section className="flex flex-col gap-16 px-16 py-24">
        <h3 className="text-16 font-600">친구 초대하기</h3>
        <section className="flex flex-col gap-4 rounded-6 bg-basic-grey-50 p-16 text-center">
          <h4 className="text-14 font-600 leading-[160%]">
            환급 예정 금액 {refundAmount.toLocaleString()}원
          </h4>
          <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
            해당 이벤트는 2026년 1월 7일부로 종료되었습니다.
            <br /> 환급 금액은 공연 종료 후 영업일 기준 4일 이내
            <br /> 입금될 예정입니다. 조금만 기다려 주세요!
          </p>
        </section>
      </section>
    </WrapperWithDivider>
  );
};

export default InvitePaybackEventSectionClosed;
