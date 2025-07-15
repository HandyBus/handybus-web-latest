import { getUserDemands } from '@/services/demand.service';
import { getUserReservations } from '@/services/reservation.service';
import {
  gtagShare,
  ShareChannel,
  UserActionInfo,
  UserActionStatus,
} from '@/utils/analytics/shareAnalytics.util';
import dayjs from 'dayjs';
import { useScrollDepth } from './useScrollDepth';

/**
 * useShareTracking
 * 공유버튼 클릭시 행사 ID, 공유수단, 스크롤 탐색 비율, 공유 발생시점에 수요조사/예약완료 여부를 추적하는 훅 입니다.
 */
interface Props {
  eventId: string;
  eventName: string;
}

export const useShareTracking = ({ eventId, eventName }: Props) => {
  const { currentScrollDepth, maxScrollDepth } = useScrollDepth();

  const getUserActionInfo = async (): Promise<UserActionInfo> => {
    try {
      const reservations = await getUserReservations({
        reservationStatus: 'COMPLETE_PAYMENT',
        eventId,
      });

      const eventReservation = reservations.toSorted((a, b) =>
        dayjs(b.createdAt).diff(dayjs(a.createdAt)),
      )[0];

      if (eventReservation) {
        return {
          status: 'complete_reservation' as UserActionStatus,
          user_action_timestamp: eventReservation.createdAt,
          time_since_action_text: formatTimeSinceActionCompact(
            eventReservation.createdAt,
          ),
        };
      }

      // 2. 수요조사 정보 조회 (해당 이벤트만)
      const demands = await getUserDemands({ eventId });
      const eventDemand = demands.shuttleDemands.toSorted((a, b) =>
        dayjs(b.createdAt).diff(dayjs(a.createdAt)),
      )[0];

      if (eventDemand) {
        return {
          status: 'complete_demand' as UserActionStatus,
          user_action_timestamp: eventDemand.createdAt,
          time_since_action_text: formatTimeSinceActionCompact(
            eventDemand.createdAt,
          ),
        };
      }

      return {
        status: 'no_action' as UserActionStatus,
      };
    } catch (error) {
      console.error('Failed to get user action info:', error);
      return {
        status: 'no_action' as UserActionStatus,
      };
    }
  };

  const trackShare = async (share_channel: ShareChannel) => {
    const userActionInfo = await getUserActionInfo();
    gtagShare(
      eventId,
      eventName,
      share_channel,
      currentScrollDepth,
      maxScrollDepth,
      userActionInfo,
    );
  };

  return {
    trackShare,
  };
};

// 커스텀 구분자를 사용한 형식: "2M_15D_3H_42MIN"
const formatTimeSinceActionCompact = (actionTimestamp: string): string => {
  const now = dayjs();
  const actionTime = dayjs(actionTimestamp);

  const years = now.diff(actionTime, 'year');
  const months = now.diff(actionTime, 'month') % 12;
  const days = now.diff(actionTime, 'day') % 30;
  const hours = now.diff(actionTime, 'hour') % 24;
  const minutes = now.diff(actionTime, 'minute') % 60;

  const parts: string[] = [];

  if (years > 0) parts.push(`${years}Y`);
  if (months > 0) parts.push(`${months}M`);
  if (days > 0) parts.push(`${days}D`);
  if (hours > 0) parts.push(`${hours}H`);
  if (minutes > 0) parts.push(`${minutes}MIN`);

  return parts.length === 0 ? '0MIN' : parts.join('_');
};
