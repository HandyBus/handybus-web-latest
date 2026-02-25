'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import CheckIcon from './icons/check.svg';
import { twMerge } from 'tailwind-merge';
import { useCreateGameRecord } from '@/services/game.service';
import {
  CatchGrapeGameRecordReadModel,
  GameActorContext,
} from '@/types/game.type';
import dayjs from 'dayjs';

interface GameBoardProps {
  nickname: string;
  actorContext: GameActorContext;
  onFinish: (
    averageScore: number,
    allScores: number[],
    record: CatchGrapeGameRecordReadModel | null,
  ) => void;
}

const TOTAL_STAGES = 5;

// Grid: 14 columns × 20 rows = 280 nodes (matches Figma layout)
const GRID_COLS = 14;
const GRID_ROWS = 20;
const GRID_SIZE = GRID_COLS * GRID_ROWS;

const GameBoard = ({ nickname, actorContext, onFinish }: GameBoardProps) => {
  const [stage, setStage] = useState(0);
  const [time, setTime] = useState(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [targetIndex, setTargetIndex] = useState(1000); // set large initial value to hide target at first render
  const [isGameStarted, setIsGameStarted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const [attemptTimes, setAttemptTimes] = useState<number[]>([]);
  const isSubmittingRef = useRef(false);

  const { mutateAsync: createRecord, isPending: isSubmitting } =
    useCreateGameRecord();

  useEffect(() => {
    setIsGameStarted(true);
  }, []);

  useEffect(() => {
    if (isGameStarted) {
      startTimeRef.current = dayjs().valueOf();
      timerRef.current = setInterval(() => {
        setTime(dayjs().valueOf() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameStarted]);

  useEffect(() => {
    if (stage < TOTAL_STAGES) {
      setTargetIndex(Math.floor(Math.random() * GRID_SIZE));
      setIsSelected(false);
      isSubmittingRef.current = false;
    }
  }, [stage]);

  const handleNodeClick = useCallback(
    (index: number) => {
      if (index === targetIndex) {
        setIsSelected(true);
      }
    },
    [targetIndex],
  );

  const handleNextStage = async () => {
    if (isSubmittingRef.current) return;

    const currentTime = dayjs().valueOf() - startTimeRef.current;
    const updatedAttemptTimes = [...attemptTimes, currentTime];
    setAttemptTimes(updatedAttemptTimes);

    if (stage === TOTAL_STAGES - 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      isSubmittingRef.current = true;

      const allScores = updatedAttemptTimes.map((score) => score);
      const averageTime = Math.round(
        updatedAttemptTimes.reduce((a, b) => a + b, 0) /
          updatedAttemptTimes.length,
      );

      try {
        const payload =
          actorContext.actorType === 'USER'
            ? { actorType: 'USER' as const, nickname, time: averageTime }
            : {
                actorType: 'GUEST' as const,
                guestKey: actorContext.guestKey,
                nickname,
                time: averageTime,
              };
        const record = await createRecord(payload);
        onFinish(averageTime, allScores, record);
      } catch (error) {
        console.error('Failed to create game record:', error);
        onFinish(averageTime, allScores, null);
      } finally {
        isSubmittingRef.current = false;
      }
    } else {
      isSubmittingRef.current = true;
      setStage((prev) => prev + 1);
      setTime(0);
      startTimeRef.current = dayjs().valueOf();
    }
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden bg-basic-grey-50">
      {/* Header + Grid Area */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
        {/* Header */}
        <div className="mb-24 w-full px-[32px] pt-[24px] [@media(max-height:680px)]:mb-8">
          <div className="relative flex items-center justify-center">
            {/* Timer */}
            <div className="text-center text-[18px] font-600 leading-[140%] text-basic-black">
              {time}ms
            </div>

            {/* Stage Counter */}
            <div className="absolute right-0 flex items-center gap-8">
              <div className="h-[13px] w-[13px] rounded-full border-2 border-solid border-[#7C68ED] bg-[#D2C9FA]" />
              <span className="text-[16px] font-600 leading-[140%]">
                {stage}/{TOTAL_STAGES}
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid content-start justify-items-center"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 16px)`,
            gap: '6px',
          }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, idx) => {
            const isTarget = idx === targetIndex;
            const isSelectedNode = isTarget && isSelected;

            return (
              <GridNode
                key={idx}
                index={idx}
                isTarget={isTarget}
                isSelectedNode={isSelectedNode}
                onClick={handleNodeClick}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-basic-grey-100 p-16">
        <button
          onClick={handleNextStage}
          disabled={!isSelected || isSubmitting}
          className={`flex h-[52px] w-full items-center justify-center rounded-8 text-[16px] font-600 leading-[160%] text-basic-white transition-all
              ${isSelected && !isSubmitting ? 'bg-brand-primary-400 active:bg-brand-primary-500' : 'bg-basic-grey-200'}`}
        >
          {isSubmitting ? '저장 중...' : '선택 완료'}
        </button>
      </div>
    </div>
  );
};

export default GameBoard;

interface GridNodeProps {
  index: number;
  isTarget: boolean;
  isSelectedNode: boolean;
  onClick: (index: number) => void;
}

const GridNode = memo(
  ({ index, isTarget, isSelectedNode, onClick }: GridNodeProps) => {
    let nodeClasses = 'w-16 h-16 transition-all duration-100 ease-in-out';
    if (isSelectedNode) {
      nodeClasses += ' bg-[#7C68ED] border-2 border-[#D2C9FA]';
    } else if (isTarget) {
      nodeClasses += ' bg-[#D2C9FA] border-2 border-[#7C68ED]';
    } else {
      nodeClasses += ' bg-[#EEEFF3] hover:bg-[#E5E5E5]';
    }

    return (
      <button
        onClick={() => onClick(index)}
        className={twMerge(
          nodeClasses,
          'flex items-center justify-center rounded-8',
        )}
      >
        {isSelectedNode && <CheckIcon className="h-[11px] w-[11px]" />}
      </button>
    );
  },
);

GridNode.displayName = 'GridNode';
