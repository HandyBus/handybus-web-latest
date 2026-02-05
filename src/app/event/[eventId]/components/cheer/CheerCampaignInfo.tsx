'use client';

import { useAtomValue } from 'jotai';
import Button from '@/components/buttons/button/Button';
import {
  cheerCampaignAtom,
  cheerTotalParticipationCountAtom,
  cheerTotalParticipationUserCountAtom,
  userTotalParticipationCountAtom,
} from '../../store/cheerAtom';
import FirstCheerModal from './FirstCheerModal';
import DiscountPolicies from './DiscountPolicies';
import CurrentCheerStatus from './CurrentCheerStatus';
import useFirstCheerModal from './hooks/useFirstCheerModal';
import useCheerButton from './hooks/useCheerButton';
import Tooltip from '@/components/tooltip/Tooltip';

const CheerCampaignInfo = () => {
  const cheerCampaign = useAtomValue(cheerCampaignAtom);
  const totalParticipationCount = useAtomValue(
    cheerTotalParticipationCountAtom,
  );
  const userTotalParticipationCount = useAtomValue(
    userTotalParticipationCountAtom,
  );
  const cheerTotalParticipationUserCount = useAtomValue(
    cheerTotalParticipationUserCountAtom,
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
        <h3 className="flex h-[22px] items-center justify-between">
          <span className="text-16 font-600">응원하고 할인 받기</span>
          <Tooltip
            position="left"
            content="적용된 할인율은 모든 노선에 일괄 적용됩니다."
          />
        </h3>
        <DiscountPolicies
          cheerCampaign={cheerCampaign}
          totalParticipationCount={totalParticipationCount}
        />
        <CurrentCheerStatus
          cheerCampaign={cheerCampaign}
          totalParticipationCount={totalParticipationCount}
          userTotalParticipationCount={userTotalParticipationCount}
        />
        <div className="flex flex-col items-center gap-8">
          <Button
            variant="primary"
            size="large"
            onClick={handleCheerButtonClick}
            disabled={buttonState.disabled || isParticipating}
          >
            {buttonState.text}
          </Button>
          <div className="text-12 font-500 text-basic-grey-600">
            지금까지 {cheerTotalParticipationUserCount}명이 참여했어요.
          </div>
        </div>
      </section>
    </>
  );
};

export default CheerCampaignInfo;
