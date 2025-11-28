'use client';

// import Link from 'next/link';
// import LargeLogo from 'public/icons/logo-large.svg';
import ChatSolidIcon from 'public/icons/chat-solid.svg';
import { useState } from 'react';
import FeedbackScreen from '../feedback/FeedbackScreen';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AppLaunchImage from './images/app-launch.png';

const DeadZonePopup = () => {
  const router = useRouter();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleFeedbackOpen = () => {
    const isLoggedIn = getIsLoggedIn();
    if (isLoggedIn) {
      setIsFeedbackOpen(true);
    } else {
      router.push('/login');
    }
  };

  const handleAppLaunchEventOpen = () => {
    router.push('/app-launch-event');
  };

  return (
    <>
      <div className="fixed bottom-52 right-[calc(50%-500px)] z-[99] flex flex-col gap-16 max-[1000px]:hidden">
        {/* <div className="flex h-252 w-[210px] flex-col items-center rounded-10 bg-basic-grey-50 px-16 py-20">
          <LargeLogo />
          <div className="mb-8 mt-12 text-20 font-700 tracking-[-0.5px]">
            집에서 콘서트장까지, <br />
            핸디버스의 이용 후기를 <br />
            살펴보세요.
          </div>
          <div className="w-full">
            <Link
              href="/reviews"
              className="text-left text-basic-grey-500 underline underline-offset-[3px]"
            >
              후기 보러 가기
            </Link>
          </div>
        </div> */}
        <button
          type="button"
          onClick={handleAppLaunchEventOpen}
          className="relative h-[277px] w-[209px] rounded-16 bg-basic-grey-50"
        >
          <Image
            src={AppLaunchImage}
            alt="앱 출시 안내"
            fill
            className="object-cover"
          />
        </button>
        <button
          onClick={handleFeedbackOpen}
          type="button"
          className="flex flex-col items-start gap-4 rounded-10 bg-basic-grey-50 p-16"
        >
          <div className="flex items-center gap-4">
            <ChatSolidIcon viewBox="0 0 24 24" />
            <div className="text-16 font-600 leading-[22.4px] tracking-[-0.5px] text-basic-grey-700 ">
              의견남기기
            </div>
          </div>
          <p className="text-12 font-400 leading-[16.8px] text-basic-grey-500">
            불편한 점이 있다면 알려주세요.
          </p>
        </button>
      </div>
      {isFeedbackOpen && (
        <FeedbackScreen
          subject="팝업"
          closeFeedbackScreen={() => setIsFeedbackOpen(false)}
        />
      )}
    </>
  );
};

export default DeadZonePopup;
