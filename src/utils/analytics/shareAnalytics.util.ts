import dayjs from 'dayjs';

export type ShareChannel = 'kakao' | 'x' | 'copy';

export type UserActionStatus =
  | 'complete_demand'
  | 'complete_reservation'
  | 'no_action';

export interface UserActionInfo {
  status: UserActionStatus;
  user_action_timestamp?: string;
  time_since_action_text?: string; // 커스텀 구분자 형식
}

export interface Props {
  eventId: string;
  eventName: string;
  share_channel: string;
  current_scroll_depth: number;
  max_scroll_depth: number;
  userActionInfo: UserActionInfo;
}

export const gtagShare = (
  eventId: string,
  eventName: string,
  share_channel: string,
  current_scroll_depth: number,
  max_scroll_depth: number,
  userActionInfo: UserActionInfo,
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const baseParams = {
      event_category: 'share',
      event_id: eventId,
      event_name: eventName.substring(0, 100),
      share_channel: share_channel,
      current_scroll_depth: current_scroll_depth,
      max_scroll_depth: max_scroll_depth,
      timestamp: dayjs().toISOString(),
    };

    const userActionParams = {
      user_action_status: userActionInfo.status,
      ...(userActionInfo.status !== 'no_action' && {
        user_action_timestamp: userActionInfo.user_action_timestamp,
        time_since_action: userActionInfo.time_since_action_text,
      }),
    };

    window.gtag('event', 'share', {
      ...baseParams,
      ...userActionParams,
    });
  }
};
