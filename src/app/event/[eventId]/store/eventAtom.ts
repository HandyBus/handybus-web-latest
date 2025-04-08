import { atom } from 'jotai';
import { EventWithRoutesViewEntity } from '@/types/event.type';

export const eventAtom = atom<EventWithRoutesViewEntity | null>(null);
