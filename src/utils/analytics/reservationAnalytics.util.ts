import dayjs from 'dayjs';

export type ReservationStep =
  | 'select_date'
  | 'select_sido'
  | 'select_hub'
  | 'select_trip_type'
  | 'hub_info'
  | 'write_name';

export const gtagEnterReservation = (
  eventId: string,
  eventName: string,
  currentScrollDepth: number,
  maxScrollDepth: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'enter_reservation', {
      event_category: 'reservation_funnel', // 이벤트 카테고리가 왜 들어가야 했지?
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      current_scroll_depth: currentScrollDepth,
      max_scroll_depth: maxScrollDepth,
      timestamp: dayjs().toISOString(),
    });
  }
};

export const gtagAbandonReservation = (
  eventId: string,
  eventName: string,
  reservationStep: ReservationStep,
  exitType: 'page_leave' | 'bottom_sheet_close',
  totalTimeMs: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'abandon_reservation', {
      event_category: 'reservation_funnel',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      reservation_step: reservationStep,
      exit_type: exitType,
      total_time_ms: totalTimeMs,
      timestamp: dayjs().toISOString(),
    });
  }
};

export const gtagCompleteReservation = (
  eventId: string,
  eventName: string,
  eventDate: string | undefined,
  selectedHubToDestination: string | undefined,
  selectedHubFromDestination: string | undefined,
  tripType: string,
  totalTimeMs: number,
  hasOtherEventReservation: boolean | undefined,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'complete_reservation', {
      event_category: 'reservation_funnel',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      event_date: eventDate,
      selected_hub_to_destination: selectedHubToDestination,
      selected_hub_from_destination: selectedHubFromDestination,
      trip_type: tripType,
      has_other_event_reservation: hasOtherEventReservation,
      total_time_ms: totalTimeMs,
      timestamp: dayjs().toISOString(),
    });
  }
};
