'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import IntroScreen from './IntroScreen';
import GameBoard from './GameBoard';
import GameOverScreen from './GameOverScreen';
import CountdownScreen from './CountdownScreen';
import PrizeScreen from './PrizeScreen';
import {
  CatchGrapeGameRecordReadModel,
  GameActorContext,
} from '@/types/game.type';
import { useGetRankings } from '@/services/game.service';
import { findRankPositionByTime } from '../utils/game.util';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';
import {
  getGrapeGamePlayCount,
  incrementGrapeGamePlayCount,
  getOrCreateGrapeGameGuestKey,
  setCatchGrapeLoginIntent,
} from '@/utils/localStorage';

export type GameStep = 'intro' | 'countdown' | 'playing' | 'prize' | 'finished';

const MAX_FREE_PLAYS = 3;

const CatchGrapeGame = () => {
  const router = useRouter();
  const [step, setStep] = useState<GameStep>('intro');
  const [nickname, setNickname] = useState('');
  const [finalScore, setFinalScore] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([]);

  const { data: rankings = [] } = useGetRankings();

  const [prizeRank, setPrizeRank] = useState<number>(0);
  const [userRank, setUserRank] = useState<number>(0);
  const [gameRecord, setGameRecord] =
    useState<CatchGrapeGameRecordReadModel | null>(null);

  // actor context: 로그인 여부에 따라 결정
  const [actorContext, setActorContext] = useState<GameActorContext | null>(
    null,
  );

  useEffect(() => {
    if (getIsLoggedIn()) {
      setActorContext({ actorType: 'USER' });
    } else {
      const guestKey = getOrCreateGrapeGameGuestKey();
      setActorContext({ actorType: 'GUEST', guestKey });
    }
  }, []);

  const handleStart = (name: string) => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn && getGrapeGamePlayCount() >= MAX_FREE_PLAYS) {
      setCatchGrapeLoginIntent();
      router.push(createLoginRedirectPath('/game/catch-grape'));
      return;
    }
    if (!isLoggedIn) {
      incrementGrapeGamePlayCount();
    }
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
        setGameRecord(record);
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
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn && getGrapeGamePlayCount() >= MAX_FREE_PLAYS) {
      setCatchGrapeLoginIntent();
      router.push(createLoginRedirectPath('/game/catch-grape'));
      return;
    }
    setStep('intro');
    setFinalScore(0);
    setScores([]);
    setPrizeRank(0);
    setUserRank(0);
    setGameRecord(null);
  };

  return (
    <main className="relative flex w-full grow flex-col items-center overflow-hidden bg-basic-grey-50">
      <Header />
      {step === 'intro' && (
        <IntroScreen initialNickname={nickname} onStart={handleStart} />
      )}
      {step === 'countdown' && (
        <CountdownScreen onComplete={handleCountdownComplete} />
      )}
      {step === 'playing' && actorContext && (
        <GameBoard
          nickname={nickname}
          actorContext={actorContext}
          onFinish={handleGameFinish}
        />
      )}
      {step === 'prize' && actorContext && (
        <PrizeScreen
          nickname={nickname}
          averageScore={finalScore}
          scores={scores}
          rank={prizeRank}
          rankings={rankings}
          gameRecord={gameRecord}
          actorContext={actorContext}
          onRestart={handleRestart}
          onNicknameChange={handleNicknameChange}
        />
      )}
      {step === 'finished' && actorContext && (
        <GameOverScreen
          nickname={nickname}
          averageScore={finalScore}
          scores={scores}
          rankings={rankings}
          gameRecord={gameRecord}
          actorContext={actorContext}
          userRank={userRank}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};

export default CatchGrapeGame;
