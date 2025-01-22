import { z } from 'zod';

/// --------- ENUM ---------
export const ActiveStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
export type ActiveStatus = z.infer<typeof ActiveStatusEnum>;

/// --------- SCHEMA ---------
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

export const PresignedUrlSchema = z.object({
  presignedUrl: z.string().url(),
  cdnUrl: z.string().url(),
});
export type PresignedUrl = z.infer<typeof PresignedUrlSchema>;
