'use client';

import Image from 'next/image';
import Button from '../buttons/button/Button';
import ButtonShadowIcon from './icons/button-shadow.svg';
import BusBannerImage from './images/bus-banner.png';
import AndroidAppQRCodeImage from './images/android-app-qr.png';
import IosAppQRCodeImage from './images/ios-app-qr.png';
import { useRouter } from 'next/navigation';

const AboutServicePopup = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('https://about.handybus.co.kr');
  };

  return (
    <div className="fixed left-[calc(max(0px,calc(100dvw-1280px)/2))] top-1/2 z-[99] flex h-full max-h-[634px] -translate-y-1/2 flex-col justify-between max-[1280px]:hidden">
      <div className="pt-40">
        <h3 className="mb-8 text-20 font-500 text-basic-grey-700">
          함께 만드는 팬덤의 여정
        </h3>
        <h2 className="mb-16 text-[48px] font-700 leading-[140%] text-basic-black">
          팬덤 여정의
          <br />
          <span
            style={{
              background:
                'linear-gradient(270deg, #181F29 -27.7%, #00E0A8 108.45%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            시작부터 끝
          </span>
          까지
          <br />
          함께합니다
        </h2>
        <p className="mb-32 text-20 font-500 leading-[140%] text-basic-grey-600">
          팬의 열정이 닿는 곳 어디든, 연결의 경험을 만들어가고 있습니다.
          <br />
          핸디버스가 여러분의 팬덤 여정을 함께하는 동행자가 되겠습니다.
        </p>
        <div className="relative px-[7px]">
          <Button
            variant="primary"
            size="medium"
            className="w-132"
            onClick={handleClick}
          >
            더 알아보기
          </Button>
          <div className="absolute left-[-8px] top-[35px] z-[-1]">
            <ButtonShadowIcon />
          </div>
        </div>
      </div>
      <div className="relative flex h-148 w-[634px] items-center justify-between overflow-hidden rounded-16 px-[38px]">
        <Image
          src={BusBannerImage}
          alt="버스 배너"
          fill
          className="z-[-2] object-cover"
        />
        <div className="absolute inset-0 z-[-1] bg-[rgba(0,0,0,0.75)]" />
        <div className="text-24 font-600 leading-[140%] text-basic-white">
          모바일 앱으로
          <br />
          더욱 편리한 탑승
        </div>
        <div className="flex gap-16">
          <div className="flex h-[95px] w-80 flex-col items-center gap-8">
            <Image
              src={IosAppQRCodeImage}
              alt="IOS 앱 QR 코드"
              width={69}
              height={69}
            />
            <div className="text-12 font-600 text-basic-white">IOS</div>
          </div>
          <div className="flex h-[95px] w-80 flex-col items-center gap-8">
            <Image
              src={AndroidAppQRCodeImage}
              alt="안드로이드 앱 QR 코드"
              width={69}
              height={69}
            />
            <div className="text-12 font-600 text-basic-white">Android</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutServicePopup;
