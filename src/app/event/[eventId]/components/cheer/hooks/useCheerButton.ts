import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { usePostEventCheerCampaignParticipation } from '@/services/cheer.service';
import { useGetUserCheerCampaignParticipations } from '@/services/user.service';
import { toast } from 'react-toastify';
import { ParticipationType } from '@/types/cheer.type';
import dayjs from 'dayjs';
import { cheerCampaignAtom } from '../../../store/cheerAtom';
import { useAtomValue } from 'jotai';

export const useCheerButton = () => {
  const cheerCampaign = useAtomValue(cheerCampaignAtom);
  console.log(cheerCampaign);

  const [hasShared, setHasShared] = useState(false);

  const today = useMemo(
    () => dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'),
    [],
  );

  const eventCheerCampaignId = cheerCampaign?.eventCheerCampaignId ?? '';

  // 오늘 참여 내역 조회
  const { data: todayParticipations } = useGetUserCheerCampaignParticipations(
    eventCheerCampaignId,
    {
      participatedDate: today,
    },
  );

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
    usePostEventCheerCampaignParticipation(eventCheerCampaignId);

  const handleCheerClick = () => {
    if (!cheerCampaign || !eventCheerCampaignId) {
      toast.error(
        '응원 캠페인 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
      );
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
    handleCheerClick,
    handleShare,
    isLoading: isPending,
  };
};
