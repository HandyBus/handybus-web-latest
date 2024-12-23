import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import Divider from '../Divider';
import { SECTION } from '@/types/shuttle.types';

const RouteSection = () => {
  return (
    <>
      <Divider />
      <ShuttleRouteVisualizer
        object={[
          { time: '2024-03-20 14:30:00', location: '청주터미널' },
          { time: '2024-03-20 14:40:00', location: '청주대학교' },
          { time: '2024-03-20 14:50:00', location: '장소3' },
          { time: '2024-03-20 15:00:00', location: '장소4' },
          { time: '2024-03-20 15:10:00', location: '장소5' },
          { time: '2024-03-20 15:20:00', location: '장소6' },
        ]}
        section={SECTION.MY_RESERVATION}
      />
    </>
  );
};

export default RouteSection;
