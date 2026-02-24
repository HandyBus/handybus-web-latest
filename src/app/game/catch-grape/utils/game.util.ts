import dayjs from 'dayjs';
import { RankingEntry } from '@/types/game.type';

const NICKNAME_PREFIXES = [
  '빠른',
  '용감한',
  '귀여운',
  '멋진',
  '신나는',
  '행복한',
  '럭키',
  '해피',
  '슈퍼',
  '쿨',
];

const NICKNAME_SUFFIXES = [
  '포도',
  '버스',
  '여행자',
  '손가락',
  '티켓',
  '팬',
  '스타',
  '플레이어',
  '히어로',
  '프로',
];

/**
 * Generate a unique nickname that doesn't exist in the provided list
 */
export const createUniqueNickname = (existingNicknames: string[]): string => {
  const maxAttempts = 100;
  for (let i = 0; i < maxAttempts; i++) {
    const prefix =
      NICKNAME_PREFIXES[Math.floor(Math.random() * NICKNAME_PREFIXES.length)];
    const suffix =
      NICKNAME_SUFFIXES[Math.floor(Math.random() * NICKNAME_SUFFIXES.length)];
    const randomNum = Math.floor(Math.random() * 100);
    const nickname = `${prefix}${suffix}${randomNum}`.slice(0, 8);

    if (!existingNicknames.includes(nickname)) {
      return nickname;
    }
  }

  // Fallback to timestamp based name if we can't find a unique one
  return `Player${dayjs().valueOf() % 10000}`.slice(0, 8);
};

/**
 * Find the rank position by time in milliseconds
 */
export const findRankPositionByTime = (
  timeMs: number,
  rankings: RankingEntry[],
): number => {
  if (rankings.length === 0) {
    return 1;
  }

  let position = 1;
  for (const entry of rankings) {
    if (timeMs < entry.time) {
      break;
    }
    position++;
  }

  return position;
};
