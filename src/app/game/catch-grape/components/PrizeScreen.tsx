'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import ArrowRightIcon from './icons/arrow-right.svg';
import { useUpdateGameRecord } from '@/services/game.service';
import {
  CatchGrapeGameRecordReadModel,
  GameActorContext,
} from '@/types/game.type';

interface PrizeScreenProps {
  nickname: string;
  averageScore: number;
  scores: number[];
  rank: number;
  top5Rankings: CatchGrapeGameRecordReadModel[];
  gameRecord: CatchGrapeGameRecordReadModel | null;
  actorContext: GameActorContext;
  onRestart: () => void;
  onNicknameChange: (newNickname: string) => void;
  showLoginPrompt: boolean;
}

const PrizeScreen = ({
  nickname,
  averageScore,
  scores,
  rank,
  top5Rankings,
  gameRecord,
  actorContext,
  onRestart,
  onNicknameChange,
  showLoginPrompt,
}: PrizeScreenProps) => {
  const [isMyRecord, setIsMyRecord] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);

  const { mutateAsync: updateRecord, isPending: isUpdating } =
    useUpdateGameRecord();

  const buildUpdatePayload = (fields: {
    nickname?: string;
    isShared?: boolean;
  }) => {
    if (!gameRecord) return null;
    if (actorContext.actorType === 'USER') {
      return {
        actorType: 'USER' as const,
        catchGrapeGameRecordId: gameRecord.id,
        ...fields,
      };
    }
    return {
      actorType: 'GUEST' as const,
      catchGrapeGameRecordId: gameRecord.id,
      guestKey: actorContext.guestKey,
      ...fields,
    };
  };

  const handleNicknameChange = async (newNickname: string) => {
    const payload = buildUpdatePayload({ nickname: newNickname });
    if (!payload) {
      setIsNicknameModalOpen(false);
      return;
    }

    try {
      await updateRecord(payload);
      onNicknameChange(newNickname);
      setIsNicknameModalOpen(false);
    } catch (error) {
      console.error('Failed to update nickname:', error);
      onNicknameChange(newNickname);
      setIsNicknameModalOpen(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      const shareUrl = `${window.location.origin}/game/catch-grape?utm_source=share&utm_medium=share&utm_campaign=catch_grape`;
      await navigator.share({
        text: `이번 티켓팅, 맹연습해서 같이 성공할까요? 친구의 포도알 잡기 실력은 평균 ${averageScore}ms 예요. ${shareUrl}`,
      });
      window.gtag?.('event', 'catch_grape_click', {
        type: 'share_result',
      });

      const payload = buildUpdatePayload({ isShared: true });
      if (payload) {
        await updateRecord(payload);
      }
    } catch (error) {
      console.error('handleShare Error:', error);
    }
  };

  return (
    <div className="px-5 relative flex h-full w-full flex-1 flex-col items-center justify-between pb-0 pt-[72px]">
      {/* Center Content Section */}
      <div className="flex w-full flex-col items-center">
        {/* Title - Dynamic rank */}
        <h1 className="mb-24 text-[32px] font-600 leading-[130%] text-[#7C68ED]">
          오예! {rank}위 등극!
        </h1>

        <div className="mb-24 flex items-center justify-between gap-12">
          {/* Ranking Message */}
          <div className="text-16 font-700 leading-[130%]">
            <span className="font-400">{nickname || '익명의 선수'}</span>
            <span>님!</span>
            <br />
            <span>전당에 오르셨어요.</span>
          </div>
          {/* Nickname Change Button */}
          <button
            onClick={() => setIsNicknameModalOpen(true)}
            disabled={isUpdating}
            className="rounded-6 bg-basic-grey-200 px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700 active:bg-basic-grey-300 disabled:opacity-50"
          >
            닉네임 변경
          </button>
        </div>

        {/* Rankings Card */}
        <div className="w-[210px] overflow-y-auto rounded-16 bg-basic-white p-16">
          {!isMyRecord ? (
            <HallOfFame
              top5Rankings={top5Rankings}
              myRank={rank}
              myNickname={nickname}
              setIsMyRecord={setIsMyRecord}
            />
          ) : (
            <MyRecords
              averageScore={averageScore}
              scores={scores}
              setIsMyRecord={setIsMyRecord}
            />
          )}
        </div>
      </div>

      {/* Bottom Button Section */}
      <div className="flex w-full flex-col items-center">
        {showLoginPrompt && (
          <p className="text-center text-14 font-500 leading-[160%]">
            로그인 후 무제한으로 연습해 보세요!
          </p>
        )}
        <div className="mb-10 flex w-full gap-8 p-16">
          {/* Restart Button */}
          <button
            onClick={() => {
              window.gtag?.('event', 'catch_grape_restart', {});
              onRestart();
            }}
            className="flex h-[52px] w-full items-center justify-center rounded-8 bg-brand-primary-50 text-[16px] font-600 leading-[160%] text-brand-primary-400 transition-colors active:bg-brand-primary-100"
          >
            다시하기
          </button>

          {/* Share Button */}
          <button
            className="flex h-[52px] w-full items-center justify-center rounded-8 bg-brand-primary-400 text-[16px] font-600 leading-[160%] text-basic-white transition-colors active:bg-brand-primary-500"
            onClick={() => handleShare()}
          >
            친구도 알려주기
          </button>
        </div>
      </div>

      {/* Nickname Change Modal */}
      {isNicknameModalOpen && (
        <NicknameModal
          currentNickname={nickname}
          isUpdating={isUpdating}
          onClose={() => setIsNicknameModalOpen(false)}
          onSubmit={handleNicknameChange}
        />
      )}
    </div>
  );
};

export default PrizeScreen;

interface HallOfFameProps {
  top5Rankings: CatchGrapeGameRecordReadModel[];
  myRank: number;
  myNickname: string;
  setIsMyRecord: Dispatch<SetStateAction<boolean>>;
}

const HallOfFame = ({
  top5Rankings,
  myRank,
  myNickname,
  setIsMyRecord,
}: HallOfFameProps) => {
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

          const rankEntry = top5Rankings[rank - 1];
          const isMyRank = rank === myRank;
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
                {!rankEntry?.time
                  ? '-----'
                  : rankEntry?.time >= 100000
                    ? '99999ms'
                    : `${rankEntry?.time}ms`}
              </span>
              <span
                className={`truncate text-12 font-600 ${
                  isMyRank
                    ? 'text-[#7C68ED]'
                    : isEmpty
                      ? 'text-basic-grey-400'
                      : ''
                }`}
              >
                {isMyRank ? myNickname : rankEntry?.nickname || '기록 없음'}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsMyRecord(true)}
        className="flex w-full items-center justify-end px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700"
      >
        내 기록 보기
        <ArrowRightIcon />
      </button>
    </div>
  );
};

interface MyRecordsProps {
  averageScore: number;
  scores: number[];
  setIsMyRecord: Dispatch<SetStateAction<boolean>>;
}

const MyRecords = ({ averageScore, scores, setIsMyRecord }: MyRecordsProps) => {
  const validScores = scores;
  const bestScore =
    validScores.length > 0 ? [...validScores].sort((a, b) => a - b)[0] : null;

  return (
    <div className="flex flex-col">
      <div className="mb-[10px] flex flex-col justify-between gap-[12px]">
        <div className="flex h-[19px] items-center gap-[10px] text-[13px] font-600 leading-[100%]">
          <span className="text-[#7C68ED]">내 평균</span>
          <span>{!averageScore ? '-----' : `${averageScore}ms`}</span>
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
                {!score ? '-----' : score >= 100000 ? '99999ms' : `${score}ms`}
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
        onClick={() => setIsMyRecord(false)}
        className="flex w-full items-center justify-end px-8 py-[6px] text-12 font-600 leading-[160%] text-basic-grey-700"
      >
        돌아가기
        <ArrowRightIcon />
      </button>
    </div>
  );
};

interface NicknameModalProps {
  currentNickname: string;
  isUpdating?: boolean;
  onClose: () => void;
  onSubmit: (newNickname: string) => void;
}

const NicknameModal = ({
  currentNickname,
  isUpdating = false,
  onClose,
  onSubmit,
}: NicknameModalProps) => {
  const [newNickname, setNewNickname] = useState(currentNickname);

  const canSubmit = newNickname.length > 0 && !isUpdating;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-basic-black/60"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-[335px] rounded-16 bg-basic-white p-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="mb-16 text-center text-16 font-600 leading-[140%]">
          전당에 올라갈 닉네임을 적어주세요.{' '}
          <span className="text-14 font-500 text-basic-grey-500">
            (최대 8자)
          </span>
        </h2>

        {/* Input Field */}
        <input
          type="text"
          value={newNickname}
          onChange={(e) => {
            const filtered = e.target.value.replace(
              /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g,
              '',
            );
            setNewNickname(filtered.slice(0, 8));
          }}
          className="mb-16 w-full rounded-8 border border-basic-grey-200 px-16 py-12 text-16 font-500 leading-[160%] outline-none focus:border-brand-primary-400"
          placeholder="닉네임을 입력하세요"
          autoFocus
          disabled={isUpdating}
        />

        {/* Submit Button */}
        <button
          onClick={() => canSubmit && onSubmit(newNickname)}
          disabled={!canSubmit}
          className={`flex h-[52px] w-full items-center justify-center rounded-8 text-16 font-600 leading-[160%] transition-colors ${
            canSubmit
              ? 'bg-brand-primary-400 text-basic-white active:bg-brand-primary-500'
              : 'cursor-not-allowed bg-basic-grey-200 text-basic-grey-400'
          }`}
        >
          {isUpdating ? '변경 중...' : '변경하기'}
        </button>
      </div>
    </div>
  );
};
