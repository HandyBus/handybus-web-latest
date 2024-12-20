import { DailyShuttleDetailProps } from './shuttle.types';

export interface EventDetailProps {
  shuttleID: number;
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
