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
import { RouteMockData } from '@/app/shuttle/[id]/write/page';

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
        shuttleId={data.shuttleId}
        type={type}
        data={data}
        shuttleStatus={shuttleStateConverter(data.status, type)}
      />
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {type === 'RESERVATION' && (
        <>
          <ShuttleRouteVisualizer
            toDestinationObject={RouteMockData}
            type={'TO_DESTINATION'}
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
