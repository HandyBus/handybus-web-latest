import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { usePostEventCheerCampaignParticipation } from '@/services/cheer.service';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';
import {
  cheerCampaignAtom,
  userTodayParticipationCountAtom,
  hasTodayBaseParticipationAtom,
  hasTodayShareParticipationAtom,
  userTotalParticipationCountAtom,
} from '../../../store/cheerAtom';
import useCheerShare from './useCheerShare';
import confetti from 'canvas-confetti';

interface UseCheerButtonProps {
  shouldShowShareButton: boolean;
  hideShareButton: () => void;
  onFirstParticipationSuccess: () => void;
}

// 응원하기 버튼 관리 훅
const useCheerButton = ({
  shouldShowShareButton,
  hideShareButton,
  onFirstParticipationSuccess,
}: UseCheerButtonProps) => {
  const router = useRouter();
  const cheerCampaign = useAtomValue(cheerCampaignAtom);
  const userTotalParticipationCount = useAtomValue(
    userTotalParticipationCountAtom,
  );
  const userTodayParticipationCount = useAtomValue(
    userTodayParticipationCountAtom,
  );
  const hasTodayBaseParticipation = useAtomValue(hasTodayBaseParticipationAtom);
  const hasTodayShareParticipation = useAtomValue(
    hasTodayShareParticipationAtom,
  );
  const { handleShare } = useCheerShare();

  const { mutate: participate, isPending: isParticipating } =
    usePostEventCheerCampaignParticipation(
      cheerCampaign?.eventCheerCampaignId ?? '',
    );

  // 버튼 상태 계산
  const buttonState = useMemo(() => {
    if (userTodayParticipationCount >= 2) {
      return {
        text: '오늘 가능한 응원을 모두 사용했어요',
        disabled: true,
        showShareButton: false,
      };
    }
    if (shouldShowShareButton) {
      return {
        text: '공유하고 한번 더 응원하기',
        disabled: false,
        showShareButton: true,
      };
    }
    return {
      text: '응원하기',
      disabled: false,
      showShareButton: false,
    };
  }, [
    userTodayParticipationCount,
    shouldShowShareButton,
    hasTodayBaseParticipation,
    hasTodayShareParticipation,
  ]);

  const runConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.9 } });
  };

  const handleCheerButtonClick = async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      const currentUrl = window.location.pathname + window.location.search;
      const loginPath = createLoginRedirectPath(currentUrl);
      router.push(loginPath);
      return;
    }

    if (!cheerCampaign?.eventCheerCampaignId) {
      return;
    }

    // 공유하고 한번 더 응원하기 버튼인 경우
    if (buttonState.showShareButton) {
      const shareSuccess = await handleShare();
      // 공유가 성공적으로 완료된 경우에만 버튼 숨김
      if (shareSuccess) {
        hideShareButton();
      }
      return;
    }

    // 첫 번째 응원 (BASE 타입)
    if (userTodayParticipationCount === 0) {
      const isFirstParticipation = userTotalParticipationCount === 0;
      participate(
        { participationType: 'BASE' },
        {
          onSuccess: () => {
            runConfetti();
            if (isFirstParticipation) {
              onFirstParticipationSuccess();
            }
          },
          onError: (error) => {
            console.error('응원 참여 실패:', error);
            toast.error('잠시 후 다시 시도해주세요.');
          },
        },
      );
      return;
    }

    // 두 번째 응원 (SHARE 타입)
    if (userTodayParticipationCount === 1 && hasTodayBaseParticipation) {
      participate(
        { participationType: 'SHARE' },
        {
          onSuccess: () => {
            runConfetti();
          },
          onError: (error) => {
            console.error('응원 참여 실패:', error);
            toast.error('잠시 후 다시 시도해주세요.');
          },
        },
      );
    }
  };

  return {
    buttonState,
    handleCheerButtonClick,
    isParticipating,
  };
};

export default useCheerButton;
