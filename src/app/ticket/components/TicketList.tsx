import Button from '@/components/buttons/button/Button';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ReservationsViewEntity } from '@/types/reservation.type';

import {
  transformReservationData,
  TransformedReservationData,
} from '@/app/ticket/utils/transformReservationData.util';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface Props {
  reservations: ReservationsViewEntity[];
}

const TicketList = ({ reservations }: Props) => {
  const transformedReservations = transformReservationData(reservations);

  return (
    <section className="flex flex-col">
      {transformedReservations.map((reservation, index) => (
        <section
          className="mx-16 flex flex-col"
          key={`${reservation.reservationId}-${reservation.tripType}`}
        >
          <TicketItem reservation={reservation} />
          {index !== transformedReservations.length - 1 && <Divider />}
        </section>
      ))}
    </section>
  );
};

interface TicketItemProps {
  reservation: TransformedReservationData;
}

const TicketItem = ({ reservation }: TicketItemProps) => {
  const { push } = useRouter();
  const {
    tripType,
    departureTime,
    departureLocation,
    eventName,
    passengerCount,
    isRoundTrip,
  } = reservation;

  const formatDepartureTime = (timeString: string) => {
    const date = dayjs(timeString);
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.day()];

    return `${date.format('MM.DD.YY')} (${weekday}) ${date.format('HH:mm')}`;
  };

  return (
    <section className="my-[25px] flex justify-between">
      <div className="flex flex-col gap-[1px]">
        <h2 className="text-16 font-600 leading-[140%] text-basic-grey-700">
          {TRIP_STATUS_TO_STRING[tripType]}
        </h2>
        <p className="text-24 font-700 leading-[140%]">
          {formatDepartureTime(departureTime)}
        </p>
        <p className="text-16 font-600 leading-[140%] text-basic-grey-700">
          {departureLocation}
        </p>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-500">
          {passengerCount}인 | {eventName}
        </p>
      </div>
      <div className="flex items-center">
        <Button
          size="small"
          onClick={() =>
            push(
              `/mypage/boarding-pass/${reservation.reservationId}${isRoundTrip && '?direction=' + tripType}`,
            )
          }
        >
          보기
        </Button>
      </div>
    </section>
  );
};

export default TicketList;

const Divider = () => {
  return <div className="h-[1.5px] w-full bg-basic-grey-100" />;
};
