'use client';

import { EventsViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import Title from './components/Title';
import EventCard from './components/EventCard';

interface Props {
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
}

const TitleSection = ({ event, reservation, shuttleRoute }: Props) => {
  return (
    <>
      <Title
        reservationStatus={reservation.reservationStatus}
        shuttleRouteStatus={shuttleRoute.status}
      />
      <EventCard event={event} />
      <div className="mx-16 mb-24 h-[38px] rounded-6 bg-basic-grey-50 px-16 py-8 text-center text-14 font-500 leading-[160%]">
        최종 탑승 정보는 탑승{' '}
        <span className="text-brand-primary-400">1일 전</span> 알려드려요.
      </div>
    </>
  );
};

export default TitleSection;
