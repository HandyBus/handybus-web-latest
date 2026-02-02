import { useState } from 'react';
import { useSetAtom } from 'jotai';
import confetti from 'canvas-confetti';
import { cheerUpParticipantsAtom } from '../../../store/cheerUpParticipantsAtom';

export const useCheerUpButton = () => {
  const [isCheeredUp, setIsCheeredUp] = useState(false);
  const setCurrentParticipants = useSetAtom(cheerUpParticipantsAtom);

  const handleCheerUpClick = () => {
    setIsCheeredUp(true);

    // confetti 발사
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.9 },
    });

    // 참여 수 증가
    setCurrentParticipants((prev) => prev + 1);
  };

  return {
    isCheeredUp,
    handleCheerUpClick,
  };
};
