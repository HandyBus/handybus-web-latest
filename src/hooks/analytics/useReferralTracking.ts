import {
  gtagClickShowMorePaybackTable,
  gtagIgnoreInvitePaybackEvent,
  gtagShareReferralCode,
  gtagViewInvitePaybackEventOverviewImage,
} from '@/utils/analytics/referralAnalytics.util';
import { useCallback } from 'react';

interface Props {
  eventId?: string;
  eventName?: string;
  eventDate?: string;
}

export const useReferralTracking = ({
  eventId,
  eventName,
  eventDate = '',
}: Props) => {
  const trackShareReferralCode = useCallback(
    (referralCode?: string) => {
      if (!eventId || !eventName || !referralCode) return;
      gtagShareReferralCode(eventName, eventId, eventDate, referralCode);
    },
    [eventName, eventId, eventDate],
  );

  const trackClickShowMorePaybackTable = useCallback(
    (action: 'open' | 'close') => {
      if (!eventId || !eventName) return;
      gtagClickShowMorePaybackTable(eventName, eventId, eventDate, action);
    },
    [eventName, eventId, eventDate],
  );

  const trackViewInvitePaybackEventBanner = useCallback(() => {
    if (!eventId || !eventName) return;
    gtagViewInvitePaybackEventOverviewImage(eventName, eventId);
  }, [eventName, eventId]);

  const trackIgnoreInvitePaybackEvent = useCallback(
    (source: 'banner' | 'modal' | 'success_page') => {
      gtagIgnoreInvitePaybackEvent(source);
    },
    [],
  );

  return {
    trackShareReferralCode,
    trackClickShowMorePaybackTable,
    trackViewInvitePaybackEventBanner,
    trackIgnoreInvitePaybackEvent,
  };
};
