import useEventText from '@/app/mypage/shuttle/components/reservations/reservation-card/hooks/useEventText';
import { EventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';

interface Props {
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
}

const EventInfoCard = ({ event, reservation }: Props) => {
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );
  const { formattedEventDate, hubText } = useEventText({
    reservation,
    event,
    dailyEvent,
  });

  return (
    <section className="px-16 pb-[26px] pt-16">
      <h6 className="line-clamp-1 grow text-16 font-600">{event.eventName}</h6>
      <p className="text-12 font-500 text-basic-grey-700">
        {event.eventLocationName}
      </p>
      <p className="text-12 font-500 text-basic-grey-700">
        {formattedEventDate}
      </p>
      <p className="text-14 font-500">{hubText}</p>
    </section>
  );
};

export default EventInfoCard;
