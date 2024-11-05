'use client';

import { useCallback, useRef, useState } from 'react';
import Rating from '@/components/rating/Rating';

interface Review {
  value?: number;
  content?: string;
  userId?: number;
  concertId?: number;
}

const Review = ({
  value = 5,
  content = '요번에도 세븐틴 캐럿랜드 막콘만 가게되어 차대절로 편하게 다녀왔습니다~~!! 버스안에 충전기도 구비되어 있어서 아주 편했어요~!! 다음에도 하루만 가게 된다면 핸디버스 차대절로 신청하려구요😆 다음번에도 핸디버스와 함께할거에요💚',
  userId = 1,
  concertId = 1,
}: Review) => {
  const [clamped, setClamped] = useState(false);
  const [useClamp, setUseClamp] = useState(true);

  const prevWidth = useRef(0);

  const ref = useCallback(
    (node: HTMLParagraphElement | null) => {
      if (node !== null) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            console.log(prevWidth);
            if (entry.target.clientWidth === prevWidth.current) continue;
            if (!useClamp) continue;
            prevWidth.current = entry.target.clientWidth;
            setClamped(entry.target.scrollHeight > entry.target.clientHeight);
          }
        });
        resizeObserver.observe(node);

        return () => {
          resizeObserver.unobserve(node);
        };
      }
    },
    [useClamp],
  );

  return (
    <div className="flex flex-col gap-[10px] rounded-[16px] bg-grey-50 p-16">
      <Rating size="medium" value={value} />
      <p
        ref={ref}
        className={`${useClamp ? 'line-clamp-2' : ''} overflow-hidden text-14 font-500 text-grey-600-sub`}
      >
        {`${userId}` + `${concertId}` + content}
      </p>
      {clamped && (
        <span onClick={() => setUseClamp((b) => !b)}>
          {useClamp ? '더 보기' : '접기'}
        </span>
      )}
    </div>
  );
};

export default Review;
