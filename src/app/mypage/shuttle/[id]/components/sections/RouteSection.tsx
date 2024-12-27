import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import Divider from '../Divider';
import { SECTION, ShuttleRouteHubObject } from '@/types/shuttle.types';

const RouteSection = () => {
  return (
    <>
      <Divider />
      <ShuttleRouteVisualizer
        toDestinationObject={mockData}
        fromDestinationObject={mockData}
        section={SECTION.MY_RESERVATION}
      />
    </>
  );
};

export default RouteSection;

const mockData = [
  {
    arrivalTime: '2024-03-20 14:30:00',
    name: '청주터미널',
    shuttleRouteHubId: 1,
    sequence: 1,
  },
  {
    arrivalTime: '2024-03-20 14:40:00',
    name: '청주대학교',
    shuttleRouteHubId: 2,
    sequence: 2,
  },
  {
    arrivalTime: '2024-03-20 14:50:00',
    name: '장소3',
    shuttleRouteHubId: 3,
    sequence: 3,
  },
  {
    arrivalTime: '2024-03-20 15:00:00',
    name: '장소4',
    shuttleRouteHubId: 4,
    sequence: 4,
  },
  {
    arrivalTime: '2024-03-20 15:10:00',
    name: '장소5',
    shuttleRouteHubId: 5,
    sequence: 5,
  },
  {
    arrivalTime: '2024-03-20 15:20:00',
    name: '장소6',
    shuttleRouteHubId: 6,
    sequence: 6,
  },
] as ShuttleRouteHubObject[];
