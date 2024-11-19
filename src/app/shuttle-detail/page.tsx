import Footer from '@/components/footer/Footer';
import ShuttleDemandStatus, {
  SHUTTLE_DEMAND_STATUS_TYPE,
} from './components/ShuttleDemandStatus';
import ShuttleSelector from './components/ShuttleSelector';
import BottomBar from './components/BottomBar';
import ShuttleRouteVisualizer from '../../components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';

import { SECTION } from '@/types/shuttle.types';
import NoticeSection, { NOTICE_TYPE } from './components/NoticeSection';
import KakaoMap from './components/KakaoMap';
import ShuttleImage from './components/ShuttleImage';
import ShuttleInfo from './components/ShuttleInfo';

// 목킹용 임시 데이터
const title = 'ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉';
const artist = 'ATEEZ';
const date = '2024. 07. 06. (토) ~ 2024. 07. 07. (일)';
const location = '경상남도체육관';
// const shuttleStatus = 'demand-survey';
const shuttleStatus = 'pending';
const shuttle_location = '충청북도 청주시';
const shuttle_date = '2024년 7월 6일 (토)';

const ShuttleDetailPage = () => {
  return (
    <main className="overflow-y-hidden">
      <ShuttleImage />
      <ShuttleInfo
        shuttleStatus={shuttleStatus}
        title={title}
        artist={artist}
        date={date}
        location={location}
      />
      <KakaoMap
        placeName="잠실실내체육관"
        latitude={37.5162}
        longitude={127.0759}
      />
      <ShuttleSelector />
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {shuttleStatus === 'pending' ? (
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
      ) : null}
      <ShuttleDemandStatus
        type={
          shuttleStatus === 'pending'
            ? SHUTTLE_DEMAND_STATUS_TYPE.DEMAND_SURVEY
            : SHUTTLE_DEMAND_STATUS_TYPE.SELECT_SHUTTLE
        }
        shuttle_date={shuttle_date}
        shuttle_location={shuttle_location}
      />
      {shuttleStatus === 'pending' ? (
        <>
          <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
          <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
        </>
      ) : null}
      <Footer />
      <BottomBar message="수요 신청하기" />
    </main>
  );
};

export default ShuttleDetailPage;
