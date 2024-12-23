import ShuttleDetailPage from '@/components/shuttle-detail/ShuttleDetailPage';
import { getOpenDemandings } from '../utils/fetch.util';

const Demand = async ({ params }: { params: { id: string } }) => {
  const data = await getOpenDemandings();
  const demandData = data.find((v) => v.shuttleId === Number(params.id));

  if (!demandData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // NOTE: need to add error page
  }

  return <ShuttleDetailPage type="DEMAND" data={demandData} />;
};

export default Demand;
