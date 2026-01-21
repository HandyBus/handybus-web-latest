'use client';

import React, { useState, useCallback } from 'react';
import IntroScreen from './IntroScreen';
import GameBoard from './GameBoard';
import GameOverScreen from './GameOverScreen';
import CountdownScreen from './CountdownScreen';
import PrizeScreen from './PrizeScreen';
import { CatchGrapeGameRecordReadModel } from '@/types/game.type';
import { useGetRankings } from '@/services/game.service';
import { findRankPositionByTime } from '../utils/game.util';

export type GameStep = 'intro' | 'countdown' | 'playing' | 'prize' | 'finished';

const CatchGrapeGame = () => {
  const [step, setStep] = useState<GameStep>('intro');
  const [nickname, setNickname] = useState('');
  const [finalScore, setFinalScore] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([]);

  const { data: rankings = [] } = useGetRankings();

  const [prizeRank, setPrizeRank] = useState<number>(0);
  const [userRank, setUserRank] = useState<number>(0);
  const [gameRecordId, setGameRecordId] = useState<string | null>(null);

  const handleStart = (name: string) => {
    setNickname(name);
    setStep('countdown');
  };

  const handleCountdownComplete = () => {
    setStep('playing');
  };

  const handleGameFinish = useCallback(
    async (
      averageScore: number,
      allScores: number[],
      record: CatchGrapeGameRecordReadModel | null,
    ) => {
      setFinalScore(averageScore);
      setScores(allScores);

      if (record) {
        setGameRecordId(record.id);
      }

      const rank = findRankPositionByTime(averageScore, rankings);
      setUserRank(rank);

      if (rank >= 1 && rank <= 5) {
        setPrizeRank(rank);
        setStep('prize');
      } else {
        setStep('finished');
      }
    },
    [rankings],
  );

  const handleNicknameChange = useCallback((newNickname: string) => {
    setNickname(newNickname);
  }, []);

  const handleRestart = () => {
    // Keep nickname for next game, only reset game state
    setStep('intro');
    setFinalScore(0);
    setScores([]);
    setPrizeRank(0);
    setUserRank(0);
    setGameRecordId(null);
  };

  return (
    <main className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-basic-grey-50">
      {step === 'intro' && (
        <IntroScreen initialNickname={nickname} onStart={handleStart} />
      )}
      {step === 'countdown' && (
        <CountdownScreen onComplete={handleCountdownComplete} />
      )}
      {step === 'playing' && (
        <GameBoard nickname={nickname} onFinish={handleGameFinish} />
      )}
      {step === 'prize' && (
        <PrizeScreen
          nickname={nickname}
          averageScore={finalScore}
          scores={scores}
          rank={prizeRank}
          rankings={rankings}
          gameRecordId={gameRecordId}
          onRestart={handleRestart}
          onNicknameChange={handleNicknameChange}
        />
      )}
      {step === 'finished' && (
        <GameOverScreen
          nickname={nickname}
          averageScore={finalScore}
          scores={scores}
          rankings={rankings}
          gameRecordId={gameRecordId}
          userRank={userRank}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};

export default CatchGrapeGame;
