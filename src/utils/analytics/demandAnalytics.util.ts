import dayjs from 'dayjs';

export type DemandStep =
  | 'demand_start'
  | 'date_selection'
  | 'sido_selection'
  | 'hub_selection'
  | 'trip_type_selection'
  | 'demand_complete';

export const trackDemandStepEnter = (
  step: DemandStep,
  eventId: string,
  eventName: string,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demand_step_enter', {
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
    window.gtag('event', 'demand_exit', {
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
  selectedHub: string,
  tripType: string,
  totalTimeMs: number,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demand_complete', {
      event_category: 'demand_funnel',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      selected_hub: selectedHub.substring(0, 100),
      trip_type: tripType,
      total_time_ms: totalTimeMs,
      timestamp: dayjs().toISOString(),
    });
  }
};
