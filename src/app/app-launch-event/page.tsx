'use client';

import Header from '@/components/header/Header';
import Image from 'next/image';
import FirstImage from './images/first.png';
import SecondImage from './images/second.png';
import Button from '@/components/buttons/button/Button';
import DownloadIcon from './icons/download.svg';
import ShareIcon from './icons/share.svg';
import LinkIcon from './icons/link.svg';
import useEnvironment from '@/hooks/useEnvironment';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';
import { useRouter } from 'next/navigation';
import { getUser, putUser } from '@/services/user.service';
import { getUserCoupons, postCoupon } from '@/services/coupon.service';
import { toast } from 'react-toastify';
import CouponIssuedModal from './components/CouponIssuedModal';
import { useState } from 'react';
import MarketingConsentModal from './components/MarketingConsentModal';
import useAppShare from '@/hooks/webview/useAppShare';
import { handleExternalLink } from '@/utils/externalLink.util';
import dayjs from 'dayjs';

const APP_LAUNCH_EVENT_COUPON_CODES = [
  'APP_LAUNCH_EVENT_1',
  'APP_LAUNCH_EVENT_2',
  'APP_LAUNCH_EVENT_3',
];

const Page = () => {
  const { isApp } = useEnvironment();
  const router = useRouter();

  const [isCouponIssuedModalOpen, setIsCouponIssuedModalOpen] = useState(false);
  const [isMarketingConsentModalOpen, setIsMarketingConsentModalOpen] =
    useState(false);

  const checkCouponAlreadyIssued = async () => {
    const coupons = await getUserCoupons();
    const isCouponAlreadyIssued = coupons.some((coupon) =>
      APP_LAUNCH_EVENT_COUPON_CODES.includes(coupon.code),
    );
    return isCouponAlreadyIssued;
  };

  const issueCoupon = async () => {
    for (const couponCode of APP_LAUNCH_EVENT_COUPON_CODES) {
      await postCoupon(couponCode);
    }
  };

  const handleCouponDownload = async () => {
    if (!isApp) {
      return;
    }
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      const redirectUrl = createLoginRedirectPath(`/app-launch-event`);
      router.replace(redirectUrl);
      return;
    }

    if (dayjs().tz('Asia/Seoul').isAfter(dayjs('2026-03-31'), 'day')) {
      toast.error('이벤트 기간이 지났어요.');
      return;
    }

    const isCouponAlreadyIssued = await checkCouponAlreadyIssued();
    if (isCouponAlreadyIssued) {
      toast.error('이미 쿠폰을 발급받았어요.');
      return;
    }

    const user = await getUser();
    if (!user) {
      return;
    }
    if (!user.marketingConsent) {
      setIsMarketingConsentModalOpen(true);
      return;
    }

    await issueCoupon();
    setIsCouponIssuedModalOpen(true);
  };

  const handleAgreeToMarkingConsent = async () => {
    await putUser({ isAgreedMarketing: true });
    await issueCoupon();
    setIsMarketingConsentModalOpen(false);
    setIsCouponIssuedModalOpen(true);
  };

  // 공유하기
  const share = useAppShare();
  const handleShare = () => {
    share({
      title: `핸디버스 앱 출시 이벤트`,
      message: `핸디버스 앱을 다운받고 쿠폰을 받아가세요!`,
      url: window.location.href,
    });
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('링크가 복사되었어요.');
  };

  // 앱 다운로드
  const handleIOSDownload = () => {
    handleExternalLink(
      'https://apps.apple.com/us/app/%ED%95%B8%EB%94%94%EB%B2%84%EC%8A%A4/id6751479950',
    );
  };
  const handleAndroidDownload = () => {
    handleExternalLink(
      'https://play.google.com/store/apps/details?id=com.handybus.app',
    );
  };

  return (
    <>
      <Header />
      <main className="grow">
        <Image src={FirstImage} alt="핸디버스 앱 출시 이벤트" />
        <Image src={SecondImage} alt="핸디버스 앱 출시 이벤트" />
        <ul className="space-y-2 mx-16 list-outside list-disc border-t border-basic-grey-200 pb-32 pl-12 pt-24 text-10 font-400 text-basic-grey-400">
          <li>행사기간 : 2025년 11월 10일 ~ 2026년 3월 31일</li>
          <li>마케팅 수신 동의 사용자에 한하여 제공됩니다.</li>
          <li>
            앱 다운로드 및 마케팅 수신 동의 후 하단의 다운받기 버튼을 누르면
            자동으로 발급됩니다. 발급받은 쿠폰은 마이페이지-쿠폰에서 확인할 수
            있습니다.
          </li>
          <li>쿠폰 유효 기한은 2026년 5월 31일입니다.</li>
        </ul>
        <section className="flex flex-col gap-16 bg-basic-black py-32">
          {isApp ? (
            <h5 className="text-center text-18 font-600 leading-[140%] text-basic-white">
              지금 바로 받아가세요!
            </h5>
          ) : (
            <h5 className="text-center text-18 font-600 leading-[140%] text-basic-white">
              앱에서 접속하면
              <br />
              쿠폰을 다운받을 수 있어요!
            </h5>
          )}
          <div className="px-32">
            <Button
              variant="primary"
              size="large"
              className="flex items-center justify-center gap-[6px]"
              disabled={!isApp}
              onClick={handleCouponDownload}
            >
              <div />
              쿠폰 다운받기 <DownloadIcon />
            </Button>
          </div>
        </section>
        <section className="bg-basic-grey-50 py-32">
          <h5 className="flex flex-col gap-16 pb-16 text-center text-24 font-700 leading-[140%]">
            친구들과
            <br />
            공연 여정을 함께하세요
          </h5>
          <div className="flex items-center justify-center gap-56 px-16 py-12">
            <button
              type="button"
              onClick={handleShare}
              className="flex flex-col items-center justify-center gap-8"
            >
              <ShareIcon />
              <span className="text-16 font-600 text-basic-grey-700">
                공유하기
              </span>
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex flex-col items-center justify-center gap-8"
            >
              <LinkIcon />
              <span className="text-16 font-600 text-basic-grey-700">
                링크 복사
              </span>
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-8 p-32">
          <Button onClick={handleIOSDownload}>IOS 다운받기</Button>
          <Button onClick={handleAndroidDownload}>안드로이드 다운받기</Button>
        </section>
      </main>
      <CouponIssuedModal
        isOpen={isCouponIssuedModalOpen}
        closeModal={() => setIsCouponIssuedModalOpen(false)}
      />
      <MarketingConsentModal
        isOpen={isMarketingConsentModalOpen}
        closeModal={() => setIsMarketingConsentModalOpen(false)}
        onNext={handleAgreeToMarkingConsent}
      />
    </>
  );
};

export default Page;
