import { DailyShuttleDetailProps } from './shuttle.types';

export enum EventType {
  CONCERT = 'CONCERT',
  FESTIVAL = 'FESTIVAL',
}

export interface EventDetailProps {
  id: number;
  name: string;
  dailyShuttles: DailyShuttleDetailProps[];
  image: string;
  status: 'OPEN' | 'ENDED' | 'INACTIVE';
  destination: {
    name: string;
    longitude: number;
    latitude: number;
  };
  type: 'CONCERT' | 'FESTIVAL';
  participants: { name: string }[];
  totalDemandCount: number;
}
