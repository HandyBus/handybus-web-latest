import dayjs from 'dayjs';

export type DemandStep =
  | 'start_demand'
  | 'select_date'
  | 'select_sido'
  | 'select_hub'
  | 'select_trip_type'
  | 'complete_demand';

export const trackDemandStepEnter = (
  step: DemandStep,
  eventId: string,
  eventName: string,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'enter_demand_step', {
      event_category: 'demand_funnel',
      demand_step: step,
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      timestamp: dayjs().toISOString(),
    });
  }
};

export const trackDemandExit = (
  step: DemandStep,
  exitType:
    | 'page_leave'
    | 'bottom_sheet_close'
    | 'back_button'
    | 'outside_click',
  eventId: string,
  eventName: string,
  timeSpentMs?: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'abandon_demand', {
      event_category: 'demand_funnel',
      demand_step: step,
      exit_type: exitType,
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      time_spent_ms: timeSpentMs,
      timestamp: dayjs().toISOString(),
    });
  }
};

export const trackDemandComplete = (
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
