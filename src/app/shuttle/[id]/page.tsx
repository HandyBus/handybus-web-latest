import ShuttleDetailPage from '@/components/shuttle-detail/ShuttleDetailPage';
import { EventDetailProps } from '@/types/event.types';

interface PageProps {
  params: {
    id: string;
  };
}

const Shuttle = async (
  {
    // params
  }: PageProps,
) => {
  const reservData: EventDetailProps = {
    // TODO: mock data
    shuttleID: 0,
    name: '',
    dailyShuttles: [],
    image: '',
    status: 'OPEN',
    destination: {
      name: '',
      longitude: 0,
      latitude: 0,
    },
    type: 'CONCERT',
    participants: [],
    totalDemandCount: 0,
  };
  return <ShuttleDetailPage type="RESERVATION" data={reservData} />;
};

export default Shuttle;
