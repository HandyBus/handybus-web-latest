import AppBar from '@/components/app-bar/AppBar';
import WriteForm from './components/WriteForm';
import BannerImage from './components/BannerImage';
import Spacer from '@/components/shuttle-detail/components/Spacer';
import { getShuttle } from '@/services/shuttleOperation';

interface Props {
  params: { id: string };
  searchParams: {
    dailyShuttleId?: string;
    bigLocation?: string;
    smallLocation?: string;
    regionId?: string;
  };
}

const DemandWrite = async ({ params, searchParams }: Props) => {
  const shuttle = await getShuttle(Number(params.id));

  if (!shuttle) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // NOTE: need to add error page
  return (
    <>
      <AppBar>수요 신청하기</AppBar>
      <main>
        <BannerImage demandData={shuttle} />
        <WriteForm demandData={shuttle} searchParams={searchParams} />
        <Spacer />
      </main>
    </>
  );
};

export default DemandWrite;
