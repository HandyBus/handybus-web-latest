'use client';

import AppBar from '@/components/app-bar/AppBar';
import Rating from '@/components/rating/Rating';
import { useState } from 'react';
import CameraIcon from 'public/icons/camera-black.svg';
import Button from '@/components/buttons/button/Button';

const WriteReview = () => {
  const [rating, setRating] = useState(0);

  return (
    <>
      <AppBar>후기 작성</AppBar>
      <form className="relative grow">
        <div className="h-100 w-full bg-grey-200">Shuttle Card</div>
        <section className="flex w-full flex-col gap-16 p-28">
          <h5>이번 셔틀의 만족도를 입력해주세요</h5>
          <div>
            <Rating size="large" value={rating} onChange={setRating} />
          </div>
        </section>
        <section className="flex w-full flex-col gap-16 p-28">
          <h5>후기를 작성해주세요 (20자 이상)</h5>
          <textarea
            placeholder="자유로운 후기를 작성해주세요. 핸디버스 발전에 도움이 됩니다. (장단점, 건의사항 등)"
            className="h-160 w-full resize-none rounded-[12px] border border-grey-100 p-12 text-16 font-400 outline-none placeholder:text-grey-300"
          />
          <button
            type="button"
            className="flex h-80 w-80 flex-col items-center justify-center gap-4 rounded-[8px] bg-grey-50 text-14 font-400 text-grey-700"
          >
            <CameraIcon />
            <span>사진 첨부</span>
          </button>
        </section>
        <div className="absolute bottom-0 left-0 right-0 p-28">
          <Button>제출하기</Button>
        </div>
      </form>
    </>
  );
};

export default WriteReview;
