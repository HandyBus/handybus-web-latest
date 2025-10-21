'use client';

import Button from '@/components/buttons/button/Button';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import WrapperWithDivider from '../../WrapperWithDivider';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { useRouter } from 'next/navigation';

interface Props {
  reservation: ReservationsViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
  isHandyParty: boolean;
}

const TicketSection = ({ reservation, shuttleRoute, isHandyParty }: Props) => {
  const isReservationCanceled = reservation.reservationStatus === 'CANCEL';

  if (isReservationCanceled) {
    return null;
  }

  return (
    <WrapperWithDivider>
      {isHandyParty ? (
        <HandyPartyTicketSection />
      ) : (
        <ShuttleBusTicketSection
          reservation={reservation}
          shuttleRoute={shuttleRoute}
        />
      )}
    </WrapperWithDivider>
  );
};

export default TicketSection;

interface ShuttleBusTicketSectionProps {
  reservation: ReservationsViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
}

const ShuttleBusTicketSection = ({
  reservation,
  shuttleRoute,
}: ShuttleBusTicketSectionProps) => {
  const isTicketExpired =
    shuttleRoute.status === 'ENDED' || shuttleRoute.status === 'INACTIVE';

  const router = useRouter();
  const openTicketLink = handleClickAndStopPropagation(() => {
    router.push(`/ticket/${reservation.reservationId}`);
  });

  return (
    <section className="flex flex-col gap-16 px-16 py-24">
      <Button
        type="button"
        onClick={openTicketLink}
        size="large"
        variant="secondary"
        disabled={isTicketExpired}
      >
        {isTicketExpired ? '이용이 만료된 탑승권입니다' : '탑승권 확인하기'}
      </Button>
      <p className="text-14 font-500 leading-[160%]">
        현장에서 탑승권을 제시한 후 탑승해 주세요.{' '}
        <span className="font-600 text-basic-red-400">
          캡쳐 이미지로는 탑승이 제한될 수 있는 점 참고해 주세요.
        </span>
      </p>
    </section>
  );
};

const HandyPartyTicketSection = () => {
  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">핸디팟 탑승</h3>
      <ul className="space-y-2 list-outside list-disc pl-16 text-14 font-400 text-basic-grey-700">
        <li>탑승 4일 전 확정 여부를 알려드려요.</li>
        <li>핸디팟 탑승은 별도의 승차권이 필요하지 않아요.</li>
        <li>탑승 시 탑승자 본인의 연락처를 제시해주세요.</li>
        <li>자세한 탑승시각 및 장소는 탑승 전날 안내됩니다.</li>
      </ul>
    </section>
  );
};
