import Footer from '@/components/footer/Footer';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import { SECTION } from '@/types/shuttle.types';
import KakaoMap from './components/KakaoMap';
import ShuttleImage from './components/ShuttleImage';
import ShuttleInfo from './components/ShuttleInfo';
import BackButton from './components/BackButton';
import NoticeSection, {
  NOTICE_TYPE,
} from '@/components/notice-section/NoticeSection';
import ShuttleForm from './components/ShuttleForm';
import Spacer from './components/Spacer';
import { EventDetailProps } from '@/types/event.types';
import { dateFormatter } from './shuttleDetailPage.utils';
import { shuttleStateConverter } from './shuttleDetailPage.utils';

interface Props {
  type: 'DEMAND' | 'RESERVATION';
  data: EventDetailProps;
}
const ShuttleDetailPage = async ({ type, data }: Props) => {
  if (data?.status === 'INACTIVE') return <div>404 Page Not Found</div>; // NOTE: need to add 404 page

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <ShuttleImage image={data.image} />
      <ShuttleInfo
        shuttleStatus={shuttleStateConverter(data.status, type)}
        title={data.name}
        artist={data.participants.map((v) => v.name).join(', ')}
        date={dateFormatter(data)}
        location={data.destination.name}
      />
      <KakaoMap
        placeName={data.destination.name}
        latitude={data.destination.latitude}
        longitude={data.destination.longitude}
      />
      <ShuttleForm
        shuttleId={data.shuttleID}
        type={type}
        data={data}
        shuttleStatus={shuttleStateConverter(data.status, type)}
      />
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {type === 'RESERVATION' && (
        <>
          <ShuttleRouteVisualizer
            object={ROUTE_OBJECT}
            section={SECTION.SHUTTLE_DETAIL}
          />
          <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
          <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
        </>
      )}
      <Footer />
      <Spacer />
    </main>
  );
};

export default ShuttleDetailPage;

const ROUTE_OBJECT = [
  { time: '2024-03-20 14:30:00', location: '청주터미널' },
  {
    time: '2024-03-20 14:40:00',
    location: '청주대학교',
    is_pickup: true,
  },
  { time: '2024-03-20 14:50:00', location: '장소3' },
  { time: '2024-03-20 15:00:00', location: '장소4' },
  {
    time: '2024-03-20 15:10:00',
    location: '장소5',
    is_dropoff: true,
  },
  { time: '2024-03-20 15:20:00', location: '장소6' },
];
