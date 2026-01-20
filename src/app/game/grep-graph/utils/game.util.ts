import { RankingEntry } from '@/types/game.type';

/**
 * Format time in milliseconds to MM:SS:CC format
 */
export const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
};

/**
 * Parse time string MM:SS:CC to milliseconds
 */
export const parseTimeToMs = (timeStr: string): number => {
  const parts = timeStr.split(':');
  if (parts.length !== 3) return 0;
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  const centiseconds = parseInt(parts[2], 10);
  return minutes * 60000 + seconds * 1000 + centiseconds * 10;
};

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
  return `Player${Date.now() % 10000}`.slice(0, 8);
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
