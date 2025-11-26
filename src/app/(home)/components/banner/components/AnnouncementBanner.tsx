'use client';

import { useGetAnnouncements } from '@/services/core.service';
import { useFlow } from '@/stacks';

// 중요한 공지사항을 반영하기. 없을 경우 상위 컴포넌트에서 주석 처리.
// 현재: 티원 홈그 주차장 안내
const ANNOUNCEMENT_TO_SHOW_ID = '602730771135862105';

const AnnouncementBanner = () => {
  const { data: announcements } = useGetAnnouncements();

  const announcementToShow = announcements?.find(
    (announcement) => announcement.id === ANNOUNCEMENT_TO_SHOW_ID,
  );

  const flow = useFlow();
  const handleAnnouncementClick = (id: string) => {
    flow.push('AnnouncementDetail', { id });
  };

  if (!announcementToShow) {
    return <div className="h-40 w-full bg-basic-grey-50" />;
  }

  return (
    <button
      type="button"
      onClick={() => handleAnnouncementClick(announcementToShow.id)}
    >
      <div className="flex h-40 items-center gap-8 bg-basic-grey-50 px-16 py-8">
        <h4 className="scale-x-[-1]">📢</h4>
        <h4 className="line-clamp-1 text-14 font-500 leading-[160%]">
          {announcementToShow.title}
        </h4>
      </div>
    </button>
  );
};

export default AnnouncementBanner;
