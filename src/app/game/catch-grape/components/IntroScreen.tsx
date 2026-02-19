'use client';

import { useState, useEffect, useRef } from 'react';
import { useGetRankings } from '@/services/game.service';
import { useGetUser } from '@/services/user.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createUniqueNickname } from '../utils/game.util';

interface IntroScreenProps {
  initialNickname?: string;
  onStart: (nickname: string) => void;
}

const IntroScreen = ({ initialNickname, onStart }: IntroScreenProps) => {
  const [nickname, setNickname] = useState(initialNickname || '');
  const { data: rankings = [], isLoading } = useGetRankings();
  const hasInitializedNickname = useRef(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);
  const { data: user, isLoading: isUserLoading } = useGetUser({
    enabled: isLoggedIn,
  });

  useEffect(() => {
    // First priority: if initialNickname is provided (from game restart), use it
    if (initialNickname) {
      setNickname(initialNickname);
      hasInitializedNickname.current = true;
    }
  }, [initialNickname]);

  useEffect(() => {
    // Second priority: set nickname based on login status
    if (!initialNickname && !hasInitializedNickname.current) {
      if (isLoggedIn) {
        // Wait for both rankings and user data to load
        if (!isLoading && !isUserLoading) {
          hasInitializedNickname.current = true;
          if (user?.name && user?.phoneNumber) {
            const phoneLast4 = user.phoneNumber.slice(-4);
            setNickname(`${user.name}${phoneLast4}`.slice(0, 8));
          } else {
            const existingNicknames = rankings.map((r) => r.nickname);
            const randomNickname = createUniqueNickname(existingNicknames);
            setNickname(randomNickname);
          }
        }
      } else if (!isLoading) {
        // Not logged in - use random nickname
        hasInitializedNickname.current = true;
        const existingNicknames = rankings.map((r) => r.nickname);
        const randomNickname = createUniqueNickname(existingNicknames);
        setNickname(randomNickname);
      }
    }
  }, [initialNickname, isLoading, rankings, isLoggedIn, isUserLoading, user]);

  const displayRankings = Array.from({ length: 5 }, (_, i) => {
    if (isLoading) {
      return {
        id: `${i}`,
        nickname: '--------',
        score: 0,
        time: 0,
      };
    }
    return (
      rankings[i] || {
        id: `empty-${i}`,
        nickname: '기록 없음',
        score: 0,
        time: 0,
      }
    );
  });

  const handleStart = () => {
    onStart(nickname);
  };

  const handleNicknameChange = (value: string) => {
    const filtered = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, '');
    setNickname(filtered.slice(0, 8));
  };

  return (
    <div className="px-5 relative flex h-full w-full flex-1 flex-col items-center justify-between bg-basic-grey-50 pb-0 pt-[72px]">
      {/* Center Content Section (Title + Rankings) */}
      <div className="flex w-full flex-col items-center">
        {/* Title Section */}
        <div className="mb-[40px] flex flex-col items-center text-center">
          <h2 className="mb-1 p-0 text-16 font-600 leading-[160%] text-basic-black ">
            자리 고민하지마 일단 가고보자
          </h2>
          <h1 className="text-[32px] font-600 leading-[130%] tracking-[-0.02em] text-[#7C68ED]">
            포도알 트레이닝
          </h1>
          <h3 className="text-16 font-500 leading-[160%] text-basic-black">
            콘서트 좌석 선택 연습용 게임
          </h3>
        </div>

        {/* Rankings Card */}
        <div className="flex w-[212px] flex-col gap-16 rounded-16 border border-basic-grey-200 bg-basic-white p-16">
          <h2 className="text-center text-[13px] font-700">
            👑 오늘의 포도알 전당 👑
          </h2>
          <div className="flex flex-col gap-12">
            {displayRankings.map((entry, index) => {
              const rank = index + 1;
              let circleClass = 'bg-[#EDEEF3]';
              if (rank === 1) circleClass = 'bg-[#7C68ED] text-basic-white';
              else if (rank === 2)
                circleClass = 'bg-[#B0A4F6] text-basic-white';
              else if (rank === 3)
                circleClass = 'bg-[#D2C9FA] text-basic-white';

              const isEmpty = entry.nickname === '기록 없음';

              return (
                <div key={entry.id} className="flex items-center gap-[10px]">
                  <div
                    className={`font-bold flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-[10px] ${circleClass}`}
                  >
                    {rank}
                  </div>
                  <span
                    className={`min-w-52 text-12 font-600 ${isLoading || isEmpty ? 'text-basic-grey-400' : ''}`}
                  >
                    {entry.score === 0
                      ? '-----'
                      : entry.score >= 100000
                        ? '99999ms'
                        : `${entry.score}ms`}
                  </span>
                  <span
                    className={`truncate text-12 font-600 ${isLoading || isEmpty ? 'text-basic-grey-400' : ''}`}
                  >
                    {entry.nickname}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-right text-10 text-basic-grey-500">
            매일 00:00에 초기화됩니다.
          </p>
        </div>
        <p className="text-center text-10 text-basic-grey-500">
          * 실제 예매 및 티켓 구매와는 무관한 연습용 화면입니다.
        </p>
      </div>

      {/* Bottom Section (Input + Button) */}
      <div className="flex w-full flex-col items-center px-16 pb-16">
        {/* Nickname Input */}
        <div className="mb-40 flex w-[calc(100%-32px)] flex-col">
          <div className="flex h-[42px] w-full items-center justify-center rounded-8 border border-basic-grey-200 bg-basic-white px-12 py-8 transition-colors focus-within:border-brand-primary-500">
            <input
              type="text"
              className="h-full w-full bg-transparent px-4 text-center text-16 font-500 leading-[150%] placeholder-basic-grey-400 focus:outline-none"
              placeholder="닉네임을 입력하세요. (최대 8자)"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
            />
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isLoading || nickname.length === 0}
          className={`flex h-[52px] w-full items-center justify-center rounded-8 text-16 font-600 leading-[160%] text-basic-white transition-all
                ${!isLoading && nickname.length > 0 ? 'bg-brand-primary-400 hover:bg-brand-primary-500' : 'bg-basic-grey-200'}`}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
