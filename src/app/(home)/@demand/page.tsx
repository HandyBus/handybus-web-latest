import Article from '@/components/article/Article';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import DemandView from './components/DemandView';
import dynamic from 'next/dynamic';
const Empty = dynamic(() => import('@/app/demand/components/Empty'));
import { getOpenDemandings } from '@/app/demand/utils/fetch.util';

// TODO check urn : /demand-survey
const Page = () => (
  <Article richTitle="수요 확인 중인 행사" showMore="/demand">
    <SubPage />
    <div className="w-full p-16">
      <RedirectButton description="찾고 있는 셔틀이 없나요?" href="/TODO">
        원하는 셔틀 요청하기
      </RedirectButton>
    </div>
  </Article>
);

export default Page;

const SubPage = async () => {
  const data = await getOpenDemandings();

  if (data.length === 0) {
    return <Empty />;
  }

  return (
    <div className="flex flex-col">
      {data.map((d) => (
        <DemandView key={d.shuttleId} event={d} />
      ))}
    </div>
  );
};
