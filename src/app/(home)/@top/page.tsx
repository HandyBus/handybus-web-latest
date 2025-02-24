import { getBanners } from '@/services/core.service';
import PromotionBanner from './components/PromotionBanner';
import { DEFAULT_SSG_REVALIDATE_TIME } from '@/constants/common';

export const revalidate = DEFAULT_SSG_REVALIDATE_TIME;

const Page = async () => {
  const bannerImages = await getBanners({
    revalidate: DEFAULT_SSG_REVALIDATE_TIME,
  });
  return (
    <>
      <PromotionBanner dynamicBannerImages={bannerImages} />
    </>
  );
};

export default Page;
