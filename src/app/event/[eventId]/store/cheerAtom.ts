import { atom } from 'jotai';
import { EventCheerCampaignsViewEntity } from '@/types/cheer.type';
import { eventAtom } from './eventAtom';

/**
 * 응원 캠페인 데이터 atom
 */
export const cheerCampaignAtom = atom<EventCheerCampaignsViewEntity | null>(
  null,
);

/**
 * 응원 캠페인이 진행 중인지 여부를 판단하는 derived atom
 * - 이벤트 상태가 STAND_BY이고
 * - 응원 캠페인이 존재하며
 * - 캠페인 상태가 RUNNING일 때 true
 */
export const isCheerCampaignRunningAtom = atom((get) => {
  const event = get(eventAtom);
  const cheerCampaign = get(cheerCampaignAtom);

  return (
    event?.eventStatus === 'STAND_BY' &&
    !!cheerCampaign &&
    cheerCampaign.status === 'RUNNING'
  );
});

/**
 * 응원 캠페인 참여 수 derived atom
 * cheerCampaignAtom에서 자동으로 추출
 */
export const cheerParticipationAtom = atom((get) => {
  const cheerCampaign = get(cheerCampaignAtom);
  return cheerCampaign?.cheerChampaignParticipationTotalCount ?? 0;
});

/**
 * 응원 캠페인의 참여 수를 증가시키는 writable atom
 */
export const incrementCheerParticipationAtom = atom(
  null,
  (get, set, increment: number = 1) => {
    const currentCampaign = get(cheerCampaignAtom);
    if (currentCampaign) {
      set(cheerCampaignAtom, {
        ...currentCampaign,
        cheerChampaignParticipationTotalCount:
          currentCampaign.cheerChampaignParticipationTotalCount + increment,
      });
    }
  },
);
