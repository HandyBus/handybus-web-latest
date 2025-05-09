import Article from '@/components/article/Article';
import Link from 'next/link';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';

const AnnouncementPreview = () => {
  return (
    <Article richTitle="공지사항" showMore="/announcements">
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
    </Article>
  );
};

export default AnnouncementPreview;

const mock_notice_data = [
  {
    id: 1,
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2021.01.01',
    url: '/announcements/1',
  },
  {
    id: 2,
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2021.01.02',
    url: '/announcements/2',
  },
];
