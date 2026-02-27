import dayjs from 'dayjs';
import { pushDataLayerEvent } from './dataLayer.util';

export const gtagShareReferralCode = (
  eventName: string,
  eventId: string,
  eventDate: string,
  referralCode: string,
) => {
  pushDataLayerEvent('share_referral_code', {
    event_category: 'referral',
    event_name: eventName,
    event_id: eventId,
    event_date: eventDate,
    referral_code: referralCode,
    timestamp: dayjs().toISOString(),
  });
};

export const gtagClickShowMorePaybackTable = (
  eventName: string,
  eventId: string,
  eventDate: string,
  action: 'open' | 'close',
) => {
  pushDataLayerEvent('click_show_more_payback_table', {
    event_category: 'referral',
    event_name: eventName,
    event_id: eventId,
    event_date: eventDate,
    action_type: action,
    timestamp: dayjs().toISOString(),
  });
};

export const gtagViewInvitePaybackEventOverviewImage = (
  eventName: string,
  eventId: string,
) => {
  pushDataLayerEvent('view_invite_payback_event_overview_image', {
    event_category: 'referral',
    event_name: eventName,
    event_id: eventId,
    timestamp: dayjs().toISOString(),
  });
};

export const gtagIgnoreInvitePaybackEvent = (
  source: 'banner' | 'modal' | 'success_page',
  totalTimeMs?: number,
) => {
  pushDataLayerEvent('ignore_invite_payback_event', {
    event_category: 'referral',
    source,
    total_time_ms: totalTimeMs ?? undefined,
    timestamp: dayjs().toISOString(),
  });
};

export const gtagClickInvitePaybackEvent = (source: 'banner' | 'modal') => {
  pushDataLayerEvent('click_invite_payback_event', {
    event_category: 'referral',
    source,
    timestamp: dayjs().toISOString(),
  });
};
