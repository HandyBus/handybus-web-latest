'use client';

import PromotionBanner from './components/PromotionBanner';
import { useGetBanners } from '@/services/core.service';
// import AnnouncementBanner from './components/AnnouncementBanner';

const BannerSection = () => {
  const { data: bannerImages } = useGetBanners();
  return (
    <>
      {/* <AnnouncementBanner /> */}
      <PromotionBanner dynamicBannerImages={bannerImages || []} />
    </>
  );
};

export default BannerSection;
