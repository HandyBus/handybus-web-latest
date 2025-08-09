import { atom } from 'jotai';
import { EventsViewEntity } from '@/types/event.type';

export const eventAtom = atom<EventsViewEntity | null>(null);
