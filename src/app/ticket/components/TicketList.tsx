import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';
import RightArrowIcon from '../icons/arrow-right.svg';
import { Fragment } from 'react';
import { useFlow } from '@/stacks';

interface Props {
  reservations: ReservationsViewEntity[];
}

const TicketList = ({ reservations }: Props) => {
  return (
    <ul className="flex flex-col">
      {reservations.map((reservation) => (
        <Fragment key={reservation.reservationId}>
          <TicketItem reservation={reservation} />
          <Divider />
        </Fragment>
      ))}
    </ul>
  );
};

interface TicketItemProps {
  reservation: ReservationsViewEntity;
}

const TicketItem = ({ reservation }: TicketItemProps) => {
  const flow = useFlow();
  const { type, shuttleRoute, passengerCount } = reservation;
  const eventName = shuttleRoute.event.eventName;
  const { departureTime, departureLocation } =
    getBoardingInformation(reservation);

  const redirectToTicketDetail = () => {
    flow.push('TicketDetail', { reservationId: reservation.reservationId });
  };

  return (
    <button
      type="button"
      className="flex w-full gap-12 p-16 text-left"
      onClick={redirectToTicketDetail}
    >
      <div className="flex grow flex-col gap-[1px]">
        <h2 className="line-clamp-1 text-14 font-600 leading-[140%] text-basic-grey-700">
          {TRIP_STATUS_TO_STRING[type]}
        </h2>
        <p className="line-clamp-1 text-22 font-700 leading-[140%]">
          {formatDepartureTime(departureTime)}
        </p>
        <p className="line-clamp-1 text-14 font-600 leading-[140%] text-basic-grey-700">
          {eventName}
        </p>
        <p className="line-clamp-1 text-12 font-500 leading-[160%] text-basic-grey-500">
          {passengerCount}인 | {departureLocation}
        </p>
      </div>
      <div className="w-24 shrink-0">
        <RightArrowIcon />
      </div>
    </button>
  );
};

export default TicketList;

const Divider = () => {
  return <div className="mx-16 my-8 h-[1.5px] bg-basic-grey-100" />;
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
