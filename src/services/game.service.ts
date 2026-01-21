import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CatchGrapeGameRecordReadModel,
  CatchGrapeGameRecordReadModelSchema,
  RankingEntry,
} from '@/types/game.type';
import { instance } from './config';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

/**
 * Get all game records
 * GET /v1/game/catch-grape-game-records
 */
export const getGameRecords = async (): Promise<
  CatchGrapeGameRecordReadModel[]
> => {
  const res = await instance.get('/v1/game/catch-grape-game-records', {
    shape: {
      catchGrapeGameRecords: CatchGrapeGameRecordReadModelSchema.array(),
    },
  });

  return res.catchGrapeGameRecords.filter(
    (record) =>
      dayjs(record.createdAt).tz('Asia/Seoul').day() ===
      dayjs().tz('Asia/Seoul').day(),
  );
};

export const useGetGameRecords = () =>
  useQuery({
    queryKey: ['game', 'records'],
    queryFn: getGameRecords,
  });

/**
 * Create a new game record
 * POST /v1/game/catch-grape-game-records
 */
export interface CreateGameRecordRequest {
  nickname: string;
  time: number;
}

export const createGameRecord = async (
  body: CreateGameRecordRequest,
): Promise<CatchGrapeGameRecordReadModel> => {
  const res = await instance.post('/v1/game/catch-grape-game-records', body, {
    shape: {
      catchGrapeGameRecord: CatchGrapeGameRecordReadModelSchema,
    },
  });
  return res.catchGrapeGameRecord;
};

export const useCreateGameRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGameRecord,
    onSuccess: () => {
      // Invalidate rankings to refresh after creating a new record
      queryClient.invalidateQueries({ queryKey: ['game', 'rankings'] });
    },
  });
};

/**
 * Update a game record (nickname and share status)
 * PUT /v1/game/catch-grape-game-records
 */
export interface UpdateGameRecordRequest {
  catchGrapeGameRecordId: string;
  nickname?: string;
  isShared?: boolean;
}

export const updateGameRecord = async (
  body: UpdateGameRecordRequest,
): Promise<CatchGrapeGameRecordReadModel> => {
  const res = await instance.put('/v1/game/catch-grape-game-records', body, {
    shape: {
      catchGrapeGameRecord: CatchGrapeGameRecordReadModelSchema,
    },
  });
  return res.catchGrapeGameRecord;
};

export const useUpdateGameRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGameRecord,
    onSuccess: () => {
      // Invalidate rankings to refresh after updating
      queryClient.invalidateQueries({ queryKey: ['game', 'rankings'] });
    },
  });
};

/**
 * Get rankings from game records
 * Converts CatchGrapeGameRecordReadModel[] to RankingEntry[]
 */
export const getRankings = async (): Promise<RankingEntry[]> => {
  const records = await getGameRecords();

  // Sort by time (ascending - lower is better) and take top 5
  // Removed isShared filter to show all records as requested
  const sortedRecords = [...records]
    .sort((a, b) => a.time - b.time)
    .slice(0, 5);

  return sortedRecords.map((record) => ({
    id: record.id,
    nickname: record.nickname,
    score: record.time,
    time: record.time,
  }));
};

export const useGetRankings = () =>
  useQuery({
    queryKey: ['game', 'rankings'],
    queryFn: getRankings,
  });
