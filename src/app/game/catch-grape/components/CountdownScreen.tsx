'use client';

import React, { useEffect, useState } from 'react';
import LogoIcon from './icons/logo.svg';
import styles from './CountdownScreen.module.css';

interface CountdownScreenProps {
  onComplete: () => void;
}

const CountdownScreen = ({ onComplete }: CountdownScreenProps) => {
  const [count, setCount] = useState(3);
  const [isShowingStart, setIsShowingStart] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsShowingStart(true);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="px-5 relative flex h-full w-full flex-col items-center overflow-hidden bg-basic-grey-50 pb-8 pt-[24px]">
      {/* HandyBus Logo */}
      <div className="mb-[84px] flex h-[56px] w-[56px] items-center justify-center">
        <LogoIcon />
      </div>

      {/* Instruction Text */}
      <div className="mb-[52px] flex flex-col items-center gap-8">
        <h2 className="m-0 p-0 text-center text-[20px] font-600 leading-[140%] text-basic-black">
          빠르게 포도알을 선택하고,
          <br />
          완료 버튼을 누르세요.
        </h2>
        <p className="mt-8 text-center text-[16px] font-600 leading-[160%]">
          총 <span className="text-[#7C68ED]">5번</span>의 기회가 주어져요.
        </p>
      </div>

      {/* Countdown Circle / Start Text */}
      <div className="mb-[32px] flex flex-1 items-start justify-center pt-8">
        {!isShowingStart ? (
          <div
            key={count}
            className={`flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#7C68ED] text-[48px] font-700 text-basic-white ${styles.popIn}`}
          >
            {count}
          </div>
        ) : (
          <div className="animate-pulse text-center text-[56px] font-600 leading-[130%] text-[#7C68ED]">
            시작!
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownScreen;
