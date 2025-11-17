'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HomeContent from '@/app/(home)/HomeContent';
import { AnnouncementResponseModel } from '@/types/announcement.type';
import { EventsViewEntity } from '@/types/event.type';
import { AdminHandleBannerRequestBanners } from '@/types/banner.type';

interface Params {
  recommendedEvents: EventsViewEntity[];
  pinnedEvents: EventsViewEntity[];
  bannerImages: AdminHandleBannerRequestBanners[];
  announcements: AnnouncementResponseModel[];
}

const HomeActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { recommendedEvents, pinnedEvents, bannerImages, announcements } =
    params;
  console.log('params', recommendedEvents);
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <HomeContent
          recommendedEvents={recommendedEvents}
          pinnedEvents={pinnedEvents}
          bannerImages={bannerImages}
          announcements={announcements}
        />
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
