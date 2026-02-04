'use client';

import { useAtomValue } from 'jotai';
import Button from '@/components/buttons/button/Button';
import {
  cheerCampaignAtom,
  cheerTotalParticipationCountAtom,
  userTotalParticipationCountAtom,
} from '../../store/cheerAtom';
import FirstCheerModal from './FirstCheerModal';
import DiscountPolicies from './DiscountPolicies';
import CurrentCheerStatus from './CurrentCheerStatus';
import useFirstCheerModal from './hooks/useFirstCheerModal';
import useCheerButton from './hooks/useCheerButton';

const CheerCampaignInfo = () => {
  const cheerCampaign = useAtomValue(cheerCampaignAtom);
  const totalParticipationCount = useAtomValue(
    cheerTotalParticipationCountAtom,
  );
  const userTotalParticipationCount = useAtomValue(
    userTotalParticipationCountAtom,
  );

  // 첫 응원 모달 관리
  const {
    isOpen: isFirstCheerModalOpen,
    shouldShowShareButton,
    openModal,
    closeModal,
    hideShareButton,
    handleShareClick,
    handleLater,
  } = useFirstCheerModal();

  // 응원하기 버튼 상태 및 핸들러
  const { buttonState, handleCheerButtonClick, isParticipating } =
    useCheerButton({
      shouldShowShareButton,
      hideShareButton,
      onFirstParticipationSuccess: openModal,
    });

  if (!cheerCampaign) {
    return null;
  }

  return (
    <>
      <FirstCheerModal
        isOpen={isFirstCheerModalOpen}
        closeModal={closeModal}
        onShare={handleShareClick}
        onLater={handleLater}
      />
      <section className="mx-16 mb-16 flex flex-col gap-16 rounded-8 border-[1.5px] border-[#F3F3F3] p-16">
        <h3 className="h-[22px] text-16 font-600">응원하고 할인 받기</h3>
        <DiscountPolicies
          cheerCampaign={cheerCampaign}
          totalParticipationCount={totalParticipationCount}
        />
        <CurrentCheerStatus
          cheerCampaign={cheerCampaign}
          totalParticipationCount={totalParticipationCount}
          userTotalParticipationCount={userTotalParticipationCount}
        />
        <Button
          variant="primary"
          size="large"
          onClick={handleCheerButtonClick}
          disabled={buttonState.disabled || isParticipating}
        >
          {buttonState.text}
        </Button>
      </section>
    </>
  );
};

export default CheerCampaignInfo;
