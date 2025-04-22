import NoticeItem from './NoticeItem';

const notices = [
  {
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2025.03.27',
    read: false,
    href: '/mypage/notice-board/1',
  },
  {
    title: '읽은 공지는 이렇게 색이 다운됩니다',
    date: '2025.03.27',
    read: true,
    href: '/mypage/notice-board/2',
  },
  {
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2025.03.27',
    read: false,
    href: '/mypage/notice-board/3',
  },
  {
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2025.03.27',
    read: false,
    href: '/mypage/notice-board/4',
  },
  {
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2025.03.27',
    read: false,
    href: '/mypage/notice-board/5',
  },
  {
    title: '[공지] 콜드플레이 지방 추가 노선 개설 안내',
    date: '2025.03.27',
    read: false,
    href: '/mypage/notice-board/6',
  },
  // ...더 많은 공지 추가 가능
];

const NoticeList = () => (
  <div className="px-16">
    <h1 className="pb-24 pt-12 text-22 font-700 leading-[140%]">공지사항</h1>
    {notices.map((notice, idx) => (
      <NoticeItem key={idx} {...notice} />
    ))}
  </div>
);

export default NoticeList;
