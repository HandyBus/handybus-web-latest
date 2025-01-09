import Article from '@/components/article/Article';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import DemandView from './components/DemandView';
import dynamic from 'next/dynamic';
import { getShuttles } from '@/services/shuttleOperation';
const Empty = dynamic(() => import('@/app/demand/components/Empty'));

const Page = () => (
  <Article richTitle="수요 확인 중인 행사" showMore="/demand">
    <SubPage />
    <div className="w-full p-16">
      <RedirectButton
        description="찾고 있는 셔틀이 없나요?"
        href={process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL}
      >
        원하는 셔틀 요청하기
      </RedirectButton>
    </div>
  </Article>
);

export default Page;

const SubPage = async () => {
  const shuttles = await getShuttles('OPEN');
  const sortedShuttles = shuttles
    .slice(0, 5)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (shuttles.length === 0) {
    return <Empty />;
  }

  return (
    <div className="flex flex-col">
      {sortedShuttles.map((d) => (
        <DemandView key={d.shuttleId} event={d} />
      ))}
    </div>
  );
};
