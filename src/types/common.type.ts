import { z } from 'zod';

export const ActiveStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
export type ActiveStatus = z.infer<typeof ActiveStatusEnum>;

type PaginatedResponse<Shape extends z.ZodRawShape> = Shape & {
  totalCount: z.ZodNumber;
  nextPage: z.ZodNullable<z.ZodString>;
};

export const withPagination = <Shape extends z.ZodRawShape>(
  shape: Shape,
): PaginatedResponse<Shape> =>
  ({
    ...shape,
    totalCount: z.number(),
    nextPage: z.string().nullable(),
  }) satisfies PaginatedResponse<Shape>;

export type PaginationParams<T> = T & {
  page?: string;
  limit?: number;
};

export const PresignedUrlSchema = z.object({
  presignedUrl: z.string().url(),
  cdnUrl: z.string().url(),
});
export type PresignedUrl = z.infer<typeof PresignedUrlSchema>;

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${'' extends P ? '' : ','}${P}`
    : never
  : never;

export type Combinations<
  T extends string,
  U extends string = T,
> = T extends string ? T | Join<T, Combinations<Exclude<U, T>>> : never;
