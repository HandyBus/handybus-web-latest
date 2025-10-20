import Button from '@/components/buttons/button/Button';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface Props {
  reservations: ReservationsViewEntity[];
}

const TicketList = ({ reservations }: Props) => {
  return (
    <section className="flex flex-col">
      {reservations.map((reservation, index) => (
        <section
          className="mx-16 flex flex-col"
          key={`${reservation.reservationId}}`}
        >
          <TicketItem reservation={reservation} />
          {index !== reservations.length - 1 && <Divider />}
        </section>
      ))}
    </section>
  );
};

interface TicketItemProps {
  reservation: ReservationsViewEntity;
}

const TicketItem = ({ reservation }: TicketItemProps) => {
  const { push } = useRouter();
  const { type, shuttleRoute, passengerCount } = reservation;
  const eventName = shuttleRoute.event.eventName;
  const { departureTime, departureLocation } =
    getBoardingInformation(reservation);

  return (
    <section className="my-[25px] flex justify-between">
      <div className="flex flex-col gap-[1px]">
        <h2 className="text-16 font-600 leading-[140%] text-basic-grey-700">
          {TRIP_STATUS_TO_STRING[type]}
        </h2>
        <p className="text-24 font-700 leading-[140%]">
          {formatDepartureTime(departureTime)}
        </p>
        <p className="text-16 font-600 leading-[140%] text-basic-grey-700">
          {eventName}
        </p>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-500">
          {passengerCount}인 | {departureLocation}
        </p>
      </div>
      <div className="flex items-center">
        <Button
          size="small"
          onClick={() => push(`/ticket/${reservation.reservationId}`)}
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

const formatDepartureTime = (timeString: string | undefined) => {
  if (!timeString) return '';
  const date = dayjs(timeString);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.day()];

  return `${date.format('YY.MM.DD')} (${weekday}) ${date.format('HH:mm')}`;
};

const getBoardingInformation = (reservation: ReservationsViewEntity) => {
  const { type, shuttleRoute } = reservation;

  let departureTime;
  let departureLocation;
  if (type === 'ROUND_TRIP' || type === 'TO_DESTINATION') {
    const toDestinationHub = shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
    );

    departureTime = toDestinationHub?.arrivalTime;
    departureLocation = toDestinationHub?.name;
  }

  if (type === 'FROM_DESTINATION') {
    const fromDestinationHub =
      shuttleRoute.fromDestinationShuttleRouteHubs?.find(
        (hub) => hub.role === 'DESTINATION',
      );

    departureTime = fromDestinationHub?.arrivalTime;
    departureLocation = fromDestinationHub?.name;
  }
  return {
    departureTime,
    departureLocation,
  };
};
