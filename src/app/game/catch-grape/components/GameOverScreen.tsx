'use client';

import React, { Dispatch, SetStateAction } from 'react';
import LogoIcon from './icons/logo.svg';
import ArrowRightIcon from './icons/arrow-right.svg';
import { RankingEntry } from '@/types/game.type';
import { useUpdateGameRecord } from '@/services/game.service';
import Link from 'next/link';

interface GameOverScreenProps {
  nickname: string;
  averageScore: number;
  scores: number[];
  rankings: RankingEntry[];
  gameRecordId: string | null;
  userRank: number;
  onRestart: () => void;
}

const GameOverScreen = ({
  nickname,
  averageScore,
  scores,
  rankings,
  gameRecordId,
  userRank,
  onRestart,
}: GameOverScreenProps) => {
  const [isHallOfFame, setIsHallOfFame] = React.useState(false);

  const { mutateAsync: updateRecord } = useUpdateGameRecord();

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/game/catch-grape`;
      navigator.share({
        text: `이번 티켓팅, 맹연습해서 같이 성공할까요? 친구의 포도알 잡기 실력은 평균 ${averageScore}ms 예요. ${shareUrl}`,
      });

      if (gameRecordId) {
        await updateRecord({
          catchGrapeGameRecordId: gameRecordId,
          isShared: true,
        });
      }
    } catch (error) {
      console.error('handleShare Error:', error);
    }
  };

  // Format user rank with comma separators
  const formattedRank = userRank.toLocaleString();

  return (
    <div className="px-5 relative flex h-full w-full flex-col items-center pb-0 pt-[24px]">
      {/* HandyBus Logo */}
      <Link
        href="/"
        className="mb-[84px] flex h-[56px] w-[56px] items-center justify-center"
      >
        <LogoIcon />
      </Link>

      {/* Title */}
      <h1 className="mb-24 text-[32px] font-600 leading-[130%] text-[#7C68ED]">
        {formattedRank}위
      </h1>

      {/* Ranking Message */}
      <div className="mb-[24px] text-center text-16 font-700 leading-[100%]">
        <span>
          {nickname}님
          <br />
          이선좌가 두렵지 않으세요..?
        </span>
      </div>

      {/* Rankings Card */}
      <div className="w-[210px] overflow-y-auto rounded-16 bg-basic-white p-16">
        {!isHallOfFame ? (
          <MyRecords
            averageScore={averageScore}
            scores={scores}
            setIsHallOfFame={setIsHallOfFame}
          />
        ) : (
          <HallOfFame rankings={rankings} setIsHallOfFame={setIsHallOfFame} />
        )}
      </div>

      {/* Bottom Button Section - Figma: 2 buttons */}
      <div className="mb-10 mt-auto flex w-full gap-8 p-16">
        {/* Share Button (Outlined style) */}
        <button
          className="mb-3 flex h-[52px] w-full items-center justify-center rounded-8 bg-brand-primary-50 text-[16px] font-600 leading-[160%] text-brand-primary-400 transition-colors active:bg-brand-primary-100"
          onClick={() => handleShare()}
        >
          친구도 알려주기
        </button>

        {/* Restart Button (Solid style) */}
        <button
          onClick={onRestart}
          className="flex h-[52px] w-full items-center justify-center rounded-8 bg-brand-primary-400 text-[16px] font-600 leading-[160%] text-basic-white transition-colors active:bg-brand-primary-500"
        >
          다시 해볼래!
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;

interface MyRecordsProps {
  averageScore: number;
  scores: number[];
  setIsHallOfFame: Dispatch<SetStateAction<boolean>>;
}

const MyRecords = ({
  averageScore,
  scores,
  setIsHallOfFame,
}: MyRecordsProps) => {
  const validScores = scores;
  const bestScore = validScores.length > 0 ? [...validScores].sort()[0] : null;

  return (
    <div className="flex flex-col">
      {/* Scrollable List Container if needed, but 5 items fit easily */}
      <div className="mb-[10px] flex flex-col justify-between gap-[12px]">
        <div className="flex h-[16px] items-center gap-[10px] text-[13px] font-600 leading-[100%]">
          <span className="text-[#7C68ED]">내 평균</span>
          <span>{averageScore}ms</span>
        </div>
        <div className="h-[1px] w-full bg-basic-grey-200" />
        {[...Array(5)].map((_, index) => {
          const rank = index + 1;
          const score = scores[index];
          const isPlayed = !!score;
          const isBest = isPlayed && score === bestScore;

          return (
            <div key={rank} className="flex items-center gap-[10px]">
              {/* Rank Circle */}
              <div
                className={`flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#EDEEF3] text-[9.5px] font-700 leading-[100%]`}
              >
                {rank}
              </div>

              {/* Score */}
              <span
                className={`text-[12px] font-500 leading-[100%] ${
                  !isBest && 'text-basic-grey-400'
                }`}
              >
                {score >= 100000 ? '99999ms' : `${score}ms`}
              </span>

              {/* Best Badge */}
              {isBest && (
                <span className="text-[12px] font-500 leading-[100%] text-[#7C68ED]">
                  최고 점수
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsHallOfFame(true)}
        className="flex w-full items-center justify-end px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700"
      >
        오늘의 순위 보기
        <ArrowRightIcon />
      </button>
    </div>
  );
};

interface HallOfFameProps {
  rankings: RankingEntry[];
  setIsHallOfFame: Dispatch<SetStateAction<boolean>>;
}

const HallOfFame = ({ rankings, setIsHallOfFame }: HallOfFameProps) => {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-center text-[13px] font-700">
        👑 오늘의 포도알 전당 👑
      </h2>
      <div className="flex flex-col gap-12">
        {Array.from({ length: 5 }, (_, i) => {
          const rank = i + 1;
          let circleClass = 'bg-[#EDEEF3]';
          if (rank === 1) circleClass = 'bg-[#7C68ED] text-basic-white';
          else if (rank === 2) circleClass = 'bg-[#B0A4F6] text-basic-white';
          else if (rank === 3) circleClass = 'bg-[#D2C9FA] text-basic-white';

          const rankEntry = rankings[rank - 1];
          const isEmpty = !rankEntry;

          return (
            <div key={rank} className="flex items-center gap-[10px]">
              <div
                className={`font-bold flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-[10px] ${circleClass}`}
              >
                {rank}
              </div>
              <span
                className={`min-w-52 text-12 font-600 ${isEmpty ? 'text-basic-grey-400' : ''}`}
              >
                {rankEntry?.score >= 100000
                  ? '99999ms'
                  : `${rankEntry?.score}ms`}
              </span>
              <span
                className={`truncate text-12 font-600 ${isEmpty ? 'text-basic-grey-400' : ''}`}
              >
                {rankEntry?.nickname || '기록 없음'}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsHallOfFame(false)}
        className="flex w-full items-center justify-end px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700"
      >
        돌아가기
        <ArrowRightIcon />
      </button>
    </div>
  );
};
