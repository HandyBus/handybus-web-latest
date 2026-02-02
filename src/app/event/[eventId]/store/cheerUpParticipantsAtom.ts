import { atom } from 'jotai';

// MOCK 초기값
const INITIAL_PARTICIPANTS = 4500;

export const cheerUpParticipantsAtom = atom<number>(INITIAL_PARTICIPANTS);
