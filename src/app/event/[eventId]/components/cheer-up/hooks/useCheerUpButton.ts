import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  useGetEventCheerCampaignByEventId,
  usePostEventCheerCampaignParticipant,
} from '@/services/cheer.service';
import { useGetUserCheerCampaignUsers } from '@/services/user.service';
import { toast } from 'react-toastify';
import { ParticipationType } from '@/types/cheer.type';
import dayjs from 'dayjs';

export const useCheerUpButton = (eventId: string) => {
  const [hasShared, setHasShared] = useState(false);

  const { data: cheerCampaign } = useGetEventCheerCampaignByEventId(eventId);

  const today = useMemo(
    () => dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'),
    [],
  );

  // 오늘 참여 내역 조회
  const { data: todayParticipations, refetch: refetchParticipations } =
    useGetUserCheerCampaignUsers(cheerCampaign?.eventCheerUpCampaignId ?? '', {
      participatedDate: today,
    });

  // 참여 타입별 확인
  const hasBaseParticipation = useMemo(
    () =>
      todayParticipations?.some(
        (participation) => participation.participationType === 'BASE',
      ) ?? false,
    [todayParticipations],
  );
  const hasShareParticipation = useMemo(
    () =>
      todayParticipations?.some(
        (participation) => participation.participationType === 'SHARE',
      ) ?? false,
    [todayParticipations],
  );

  // 버튼 상태 결정
  const canCheerBase = !hasBaseParticipation;
  const canCheerShare =
    hasBaseParticipation && hasShared && !hasShareParticipation;
  const isAllCompleted = hasBaseParticipation && hasShareParticipation;

  const { mutate: participate, isPending } =
    usePostEventCheerCampaignParticipant(
      cheerCampaign?.eventCheerUpCampaignId ?? '',
    );

  const handleCheerUpClick = () => {
    if (!cheerCampaign) {
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    let participationType: ParticipationType;
    switch (true) {
      case canCheerBase:
        participationType = 'BASE';
        break;
      case canCheerShare:
        participationType = 'SHARE';
        break;
      default:
        return;
    }

    participate(
      { participationType },
      {
        onSuccess: () => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.9 },
          });

          refetchParticipations();
          if (participationType === 'SHARE') {
            setHasShared(false);
          }
        },
        onError: (error) => {
          console.error(error);
          toast.error('잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  const handleShare = () => {
    setHasShared(true);
  };

  return {
    hasBaseParticipation,
    hasShareParticipation,
    isAllCompleted,
    canCheerBase,
    canCheerShare,
    hasShared,
    handleCheerUpClick,
    handleShare,
    isLoading: isPending,
  };
};
