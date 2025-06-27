import dayjs from 'dayjs';

export type DemandStep =
  | 'select_date'
  | 'select_sido'
  | 'select_hub'
  | 'select_trip_type'
  | 'hub_info';

export const gtagEnterDemand = (eventId: string, eventName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'enter_demand', {
      event_category: 'demand_funnel',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      timestamp: dayjs().toISOString(),
    });
  }
};

export const gtagAbandonDemand = (
  step: DemandStep,
  exitType: 'page_leave' | 'bottom_sheet_close',
  eventId: string,
  eventName: string,
  total_time_ms?: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'abandon_demand', {
      event_category: 'demand_funnel',
      demand_step: step,
      exit_type: exitType,
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      total_time_ms: total_time_ms,
      timestamp: dayjs().toISOString(),
    });
  }
};

export const gtagCompleteDemand = (
  eventId: string,
  eventName: string,
  eventDate: string,
  selectedHub: string,
  tripType: string,
  totalTimeMs: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'complete_demand', {
      event_category: 'demand_funnel',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      event_date: eventDate,
      selected_hub: selectedHub.substring(0, 100),
      trip_type: tripType,
      total_time_ms: totalTimeMs,
      timestamp: dayjs().toISOString(),
    });
  }
};
