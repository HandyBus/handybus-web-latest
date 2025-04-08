import ArticleV2 from '@/components/article/ArticleV2';
import Link from 'next/link';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';

const NoticeBoard = () => {
  return (
    <ArticleV2 richTitle="공지사항" showMore="/notice">
      <div className="flex flex-col">
        {mock_notice_data.map((v) => (
          <Link key={v.id} href={v.url} className="flex items-center py-12">
            <div>
              <p className="text-14 font-600 leading-[160%] text-basic-black">
                {v.title}
              </p>
              <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
                {v.date}
              </p>
            </div>
            <ChevronRightEm className="ml-auto h-24 w-24 stroke-[1] text-basic-grey-400" />
          </Link>
        ))}
      </div>
    </ArticleV2>
  );
};

export default NoticeBoard;

const mock_notice_data = [
  {
    id: 1,
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2021.01.01',
    url: '/notice/1',
  },
  {
    id: 2,
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2021.01.02',
    url: '/notice/2',
  },
];
