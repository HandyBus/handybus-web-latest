import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CatchGrapeGameRecordReadModel,
  CatchGrapeGameRecordReadModelSchema,
  CreateGameRecordRequest,
  RankingEntry,
} from '@/types/game.type';
import { authInstance, instance } from './config';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const getKSTDateString = (): string => {
  return dayjs().tz('Asia/Seoul').format('YYYY-MM-DD');
};

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
 * 일별 상위 5순위 조회
 * GET /v1/game/catch-grape-game-records/top?date=YYYY-MM-DD
 */
export const getTopRankings = async (
  date: string,
): Promise<CatchGrapeGameRecordReadModel[]> => {
  const res = await instance.get(
    `/v1/game/catch-grape-game-records/top?date=${date}`,
    {
      shape: {
        catchGrapeGameRecords: CatchGrapeGameRecordReadModelSchema.array(),
      },
    },
  );
  return res.catchGrapeGameRecords;
};

export const useGetTopRankings = () => {
  const date = getKSTDateString();
  return useQuery({
    queryKey: ['game', 'rankings', 'top', date],
    queryFn: () => getTopRankings(date),
  });
};

/**
 * Get rankings from game records (전체 레코드 기반)
 * Converts CatchGrapeGameRecordReadModel[] to RankingEntry[]
 */
export const getRankings = async (): Promise<RankingEntry[]> => {
  const records = await getGameRecords();

  // Sort by time (ascending - lower is better) and take top 5
  const sortedRecords = [...records].sort((a, b) => a.time - b.time);

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

/**
 * 포도알 게임 기록 생성 (v2)
 * POST /v2/game/catch-grape-game-records
 * actorType에 따라 instance/authInstance 분기
 */

export const createGameRecord = async (
  body: CreateGameRecordRequest,
): Promise<CatchGrapeGameRecordReadModel> => {
  const api = body.actorType === 'USER' ? authInstance : instance;
  const res = await api.post('/v2/game/catch-grape-game-records', body, {
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
      queryClient.invalidateQueries({ queryKey: ['game', 'rankings'] });
    },
  });
};

/**
 * 포도알 게임 기록 수정 (v2)
 * PUT /v2/game/catch-grape-game-records
 * actorType에 따라 instance/authInstance 분기
 */
export type UpdateGameRecordRequest =
  | {
      actorType: 'USER';
      catchGrapeGameRecordId: string;
      nickname?: string;
      isShared?: boolean;
    }
  | {
      actorType: 'GUEST';
      catchGrapeGameRecordId: string;
      guestKey: string;
      nickname?: string;
      isShared?: boolean;
    };

export const updateGameRecord = async (
  body: UpdateGameRecordRequest,
): Promise<CatchGrapeGameRecordReadModel> => {
  const api = body.actorType === 'USER' ? authInstance : instance;
  // actorType은 FE 라우팅용, API body에서는 제외
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { actorType, ...payload } = body;
  const res = await api.put('/v2/game/catch-grape-game-records', payload, {
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
      queryClient.invalidateQueries({ queryKey: ['game', 'rankings'] });
    },
  });
};
