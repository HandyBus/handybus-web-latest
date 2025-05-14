import { CustomError } from '@/services/custom-error';
import { postUpdateReservation } from '@/services/reservation.service';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useCancelApplyHandy = (
  reservationId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (e: CustomError) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      postUpdateReservation(reservationId, { isSupportingHandy: false }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      onSuccess?.();
      toast.success('핸디 지원을 취소했어요.');
    },
    onError: (e) => {
      const error = e as CustomError;
      onError?.(error);
      toast.error('핸디 지원을 취소하지 못했어요.');
    },
  });
};

export default useCancelApplyHandy;
