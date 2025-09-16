import { z } from 'zod';

const ReservationTransferRequestStatusEnum = z.enum([
  'PENDING',
  'ACCEPTED',
  'DECLINED',
  'CANCELLED',
]);

export const ReservationTransferRequestsEntitySchema = z.object({
  id: z.string(),
  reservationId: z.string(),
  token: z.string(),
  receiverPhoneNumber: z.string(),
  expiresAt: z.string(),
  status: ReservationTransferRequestStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ReservationTransferRequestsEntity = z.infer<
  typeof ReservationTransferRequestsEntitySchema
>;
