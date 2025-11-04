'use client';

import Header from '@/components/header/Header';
import Image from 'next/image';
import FirstImage from './images/first.png';
import SecondImage from './images/second.png';
import Button from '@/components/buttons/button/Button';
import DownloadIcon from './icons/download.svg';
import ShareIcon from './icons/share.svg';
import LinkIcon from './icons/link.svg';

const Page = () => {
  return (
    <>
      <Header />
      <main className="grow">
        <Image src={FirstImage} alt="핸디버스 앱 출시 이벤트" />
        <Image src={SecondImage} alt="핸디버스 앱 출시 이벤트" />
        <ul className="space-y-2 mx-16 list-outside list-disc border-t border-basic-grey-200 pb-32 pl-12 pt-24 text-10 font-400 text-basic-grey-400">
          <li>행사기간 : 2025년 11월 10일 ~ 2025년 12월 31일</li>
          <li>마케팅 수신 동의 사용자에 한하여 제공됩니다.</li>
          <li>
            앱 다운로드 및 마케팅 수신 동의 후 하단의 다운받기 버튼을 누르면
            자동으로 발급됩니다. 발급받은 쿠폰은 마이페이지-쿠폰에서 확인할 수
            있습니다.
          </li>
          <li>쿠폰 유효 기한은 2026년 5월 31일입니다.</li>
        </ul>
        <section className="flex flex-col gap-16 bg-basic-black py-32">
          <h5 className="text-center text-18 font-600 text-basic-white">
            지금 바로 받아가세요!
          </h5>
          <div className="px-32">
            <Button
              variant="primary"
              size="large"
              className="flex items-center justify-center gap-[6px]"
            >
              <div />
              쿠폰 다운받기 <DownloadIcon />
            </Button>
          </div>
        </section>
        <section className="py-32">
          <h5 className="flex flex-col gap-16 pb-16 text-center text-24 font-700 leading-[140%]">
            친구들과
            <br />
            공연 여정을 함께하세요
          </h5>
          <div className="flex items-center justify-center gap-56 px-16 py-12">
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-8"
            >
              <ShareIcon />
              <span className="text-16 font-600 text-basic-grey-700">
                공유하기
              </span>
            </button>
            <button
              type="button"
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
          <Button>IOS 다운받기</Button>
          <Button>안드로이드 다운받기</Button>
        </section>
      </main>
    </>
  );
};

export default Page;
