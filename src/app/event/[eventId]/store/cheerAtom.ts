import { atom } from 'jotai';
import {
  EventCheerCampaignsViewEntity,
  EventCheerCampaignParticipationResponse,
} from '@/types/cheer.type';
import { eventAtom } from './eventAtom';

/**
 * 응원 캠페인 데이터 atom
 */
export const cheerCampaignAtom = atom<EventCheerCampaignsViewEntity | null>(
  null,
);

/**
 * 사용자의 전체 참여 내역 atom
 */
export const userTotalParticipationsAtom = atom<
  EventCheerCampaignParticipationResponse[]
>([]);

/**
 * 사용자의 오늘 참여 내역 atom
 */
export const userTodayParticipationsAtom = atom<
  EventCheerCampaignParticipationResponse[]
>([]);

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
export const cheerTotalParticipationCountAtom = atom((get) => {
  const cheerCampaign = get(cheerCampaignAtom);
  return cheerCampaign?.cheerCampaignParticipationTotalCount ?? 0;
});

/**
 * 사용자의 오늘 참여 횟수 derived atom
 */
export const userTotalParticipationCountAtom = atom((get) => {
  const participations = get(userTodayParticipationsAtom);
  return participations.length;
});

/**
 * 사용자의 오늘 참여 횟수 derived atom
 */
export const userTodayParticipationCountAtom = atom((get) => {
  const participations = get(userTodayParticipationsAtom);
  return participations.length;
});

/**
 * 사용자가 오늘 BASE 타입으로 참여했는지 여부
 */
export const hasTodayBaseParticipationAtom = atom((get) => {
  const participations = get(userTodayParticipationsAtom);
  return participations.some((p) => p.participationType === 'BASE');
});

/**
 * 사용자가 오늘 SHARE 타입으로 참여했는지 여부
 */
export const hasTodayShareParticipationAtom = atom((get) => {
  const participations = get(userTodayParticipationsAtom);
  return participations.some((p) => p.participationType === 'SHARE');
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
        cheerCampaignParticipationTotalCount:
          currentCampaign.cheerCampaignParticipationTotalCount + increment,
      });
    }
  },
);
