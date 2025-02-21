import { getBanners } from '@/services/core.service';
import PromotionBanner from './components/PromotionBanner';

export const revalidate = 3600;

const Page = async () => {
  const bannerImages = await getBanners();
  return (
    <>
      <PromotionBanner dynamicBannerImages={bannerImages} />
    </>
  );
};

export default Page;
