import { toast } from 'react-toastify';
import { authInstance } from './config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteDemand = async ({
  shuttleId,
  dailyShuttleId,
  shuttleDemandId: Id,
}: {
  shuttleId: number;
  dailyShuttleId: number;
  shuttleDemandId: number;
}) => {
  return await authInstance.delete(
    `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/${Id}`,
  );
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDemand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};
