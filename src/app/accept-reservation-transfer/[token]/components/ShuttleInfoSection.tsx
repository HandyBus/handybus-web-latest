import { ReservationsViewEntity } from '@/types/reservation.type';
import { getBoardingTime } from '@/utils/reservation.util';
import { dateString } from '@/utils/dateString.util';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { getHubText } from '@/utils/event.util';
import { GD_FANMEETING_EVENT_ID } from '@/app/event/[eventId]/components/event-content/components/ShuttleScheduleView';

interface Props {
  reservation: ReservationsViewEntity;
}

const ShuttleInfoSection = ({ reservation }: Props) => {
  const event = reservation.shuttleRoute.event;
  const boardingTime = getBoardingTime(reservation);
  const tripType = reservation.type;

  const eventName = event.eventName;
  const formattedBoardingTime = dateString(boardingTime, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  const tripTypeText = TRIP_STATUS_TO_STRING[tripType];
  const hubText = getHubText(reservation);
  const passengerCount = reservation.passengerCount;

  const isTransferredReservation =
    reservation.originalUserId !== reservation.userId;

  return (
    <section className="p-16">
      <h3 className="pb-16 text-16 font-600">셔틀 정보</h3>
      <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
        <h5>행사명</h5>
        <p>{eventName}</p>
        <h5>탑승 일시</h5>
        <p>
          {event.eventId !== GD_FANMEETING_EVENT_ID
            ? formattedBoardingTime
            : '미정'}
        </p>
        <h5>탑승 유형</h5>
        <p>
          {isTransferredReservation && '[핸디팟] '}
          {tripTypeText}
        </p>
        <h5>탑승 정보</h5>
        <p>{hubText}</p>
        <h5>인원</h5>
        <p>{passengerCount}명</p>
      </div>
    </section>
  );
};

export default ShuttleInfoSection;
