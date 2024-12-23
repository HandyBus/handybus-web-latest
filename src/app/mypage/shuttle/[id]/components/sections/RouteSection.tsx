import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import Divider from '../Divider';
import { SECTION } from '@/types/shuttle.types';

const RouteSection = () => {
  return (
    <>
      <Divider />
      <ShuttleRouteVisualizer
        object={[
          { time: '2024-03-20 14:30:00', hubName: '청주터미널', hubId: '1' },
          { time: '2024-03-20 14:40:00', hubName: '청주대학교', hubId: '2' },
          { time: '2024-03-20 14:50:00', hubName: '장소3', hubId: '3' },
          { time: '2024-03-20 15:00:00', hubName: '장소4', hubId: '4' },
          { time: '2024-03-20 15:10:00', hubName: '장소5', hubId: '5' },
          { time: '2024-03-20 15:20:00', hubName: '장소6', hubId: '6' },
        ]}
        section={SECTION.MY_RESERVATION}
      />
    </>
  );
};

export default RouteSection;
