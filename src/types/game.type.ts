import { z } from 'zod';

export const CatchGrapeActorTypeSchema = z.enum(['USER', 'GUEST']);
export type CatchGrapeActorType = z.infer<typeof CatchGrapeActorTypeSchema>;

export const CatchGrapeGameRecordReadModelSchema = z
  .object({
    id: z.string(),
    actorType: CatchGrapeActorTypeSchema,
    guestKey: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
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

// 컴포넌트/서비스 공용 actor context 타입
export const GameActorContextSchema = z.discriminatedUnion('actorType', [
  z.object({
    actorType: z.literal('USER'),
  }),
  z.object({
    actorType: z.literal('GUEST'),
    guestKey: z.string(),
  }),
]);
export type GameActorContext = z.infer<typeof GameActorContextSchema>;

export const CreateGameRecordRequestSchema = z.discriminatedUnion('actorType', [
  z.object({
    actorType: z.literal('USER'),
    nickname: z.string(),
    time: z.number(),
  }),
  z.object({
    actorType: z.literal('GUEST'),
    guestKey: z.string(),
    nickname: z.string(),
    time: z.number(),
  }),
]);

export type CreateGameRecordRequest = z.infer<
  typeof CreateGameRecordRequestSchema
>;
