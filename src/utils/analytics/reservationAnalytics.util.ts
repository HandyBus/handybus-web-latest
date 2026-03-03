import dayjs from 'dayjs';
import { pushDataLayerEvent } from './dataLayer.util';

export type ReservationStep =
  | 'select_date'
  | 'select_sido'
  | 'select_product'
  | 'select_hub'
  | 'select_multiple_routes'
  | 'select_trip_type'
  | 'hub_info'
  | 'handy_party_select_trip_type'
  | 'handy_party_select_address'
  | 'handy_party_select_map'
  | 'handy_party_select_reservation_info'
  | 'handy_party_write_name'
  | 'write_name'
  | 'payment'
  | 'request_payment'
  | 'success_payment';

export const gtagEnterReservation = (
  eventId: string,
  eventName: string,
  currentScrollDepth: number,
  maxScrollDepth: number,
) => {
  pushDataLayerEvent('enter_reservation', {
    event_category: 'reservation_funnel',
    event_id: eventId,
    event_name: eventName.substring(0, 100),
    current_scroll_depth: currentScrollDepth,
    max_scroll_depth: maxScrollDepth,
    timestamp: dayjs().toISOString(),
  });
};

export const gtagAbandonReservation = (
  eventId: string,
  eventName: string,
  reservationStep: ReservationStep,
  exitType: 'page_leave' | 'bottom_sheet_close',
  totalTimeMs: number,
  debug?: string,
) => {
  pushDataLayerEvent('abandon_reservation', {
    event_category: 'reservation_funnel',
    event_id: eventId,
    event_name: eventName.substring(0, 100),
    reservation_step: reservationStep,
    exit_type: exitType,
    debug,
    total_time_ms: totalTimeMs,
    timestamp: dayjs().toISOString(),
  });
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
  paymentId: string | undefined,
  referralCode: string | undefined,
) => {
  pushDataLayerEvent('complete_reservation', {
    event_category: 'reservation_funnel',
    event_id: eventId,
    event_name: eventName.substring(0, 100),
    event_date: eventDate,
    selected_hub_to_destination: selectedHubToDestination,
    selected_hub_from_destination: selectedHubFromDestination,
    trip_type: tripType,
    has_other_event_reservation: hasOtherEventReservation,
    payment_id: paymentId,
    referral_code: referralCode,
    total_time_ms: totalTimeMs,
    timestamp: dayjs().toISOString(),
  });
};
