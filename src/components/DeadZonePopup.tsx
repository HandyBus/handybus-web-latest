'use client';

import LargeLogo from '@/icons/logo-large.svg';

const DeadZonePopup = () => {
  const redirectToReview = () => {};

  return (
    <div className="absolute bottom-52 right-[calc(50%-500px)] z-[99] flex h-252 w-[210px] flex-col items-center rounded-[10px] bg-grey-50 px-16 py-20 max-[1000px]:hidden">
      <LargeLogo />
      <div className="mb-8 mt-12 text-20 font-700 tracking-[-0.5px]">
        집에서 콘서트장까지, <br />
        핸디버스의 이용 후기를 <br />
        살펴보세요.
      </div>
      <div className="w-full">
        <button
          onClick={redirectToReview}
          type="button"
          className="text-left text-grey-500 underline underline-offset-[3px]"
        >
          후기 보러 가기
        </button>
      </div>
    </div>
  );
};

export default DeadZonePopup;
