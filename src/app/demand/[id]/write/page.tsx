import AppBar from '@/components/app-bar/AppBar';
import WriteForm from './components/WriteForm';
import BannerImage from './components/BannerImage';
import Spacer from '@/components/shuttle-detail/components/Spacer';
import { getOpenDemandings } from '../../utils/fetch.util';

interface Props {
  params: { id: string };
  searchParams: {
    dailyShuttleID?: string;
    bigLocation?: string;
    smallLocation?: string;
    regionID?: string;
  };
}

const DemandWrite = async ({ params, searchParams }: Props) => {
  const data = await getOpenDemandings();
  const demandData = data.find((v) => v.shuttleId === Number(params.id));

  if (!demandData) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // NOTE: need to add error page
  return (
    <>
      <AppBar>수요 신청하기</AppBar>
      <main>
        <BannerImage demandData={demandData} />
        <WriteForm demandData={demandData} searchParams={searchParams} />
        <Spacer />
      </main>
    </>
  );
};

export default DemandWrite;
