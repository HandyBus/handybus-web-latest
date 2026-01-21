import { z } from 'zod';

export const CatchGrapeGameRecordReadModelSchema = z
  .object({
    id: z.string(),
    nickname: z.string(),
    time: z.number(),
    isShared: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();

export type CatchGrapeGameRecordReadModel = z.infer<
  typeof CatchGrapeGameRecordReadModelSchema
>;

export interface RankingEntry {
  id: string;
  nickname: string;
  score: number;
  time: number;
}
