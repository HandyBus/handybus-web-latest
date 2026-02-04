import { useEffect, useState } from 'react';
import useCheerShare from './useCheerShare';
import { useAtomValue } from 'jotai';
import {
  hasTodayBaseParticipationAtom,
  hasTodayShareParticipationAtom,
} from '../../../store/cheerAtom';

// 첫 응원 완료 모달 관리 훅
const useFirstCheerModal = () => {
  const hasTodayBaseParticipation = useAtomValue(hasTodayBaseParticipationAtom);
  const hasTodayShareParticipation = useAtomValue(
    hasTodayShareParticipationAtom,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowShareButton, setShouldShowShareButton] = useState(
    hasTodayBaseParticipation && !hasTodayShareParticipation,
  );
  useEffect(() => {
    setShouldShowShareButton(
      hasTodayBaseParticipation && !hasTodayShareParticipation,
    );
  }, [hasTodayBaseParticipation, hasTodayShareParticipation]);

  const { handleShare } = useCheerShare();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleShareClick = () => {
    handleShare();
    closeModal();
  };

  const handleLater = () => {
    closeModal();
    setShouldShowShareButton(true);
  };

  const hideShareButton = () => {
    setShouldShowShareButton(false);
  };

  return {
    isOpen,
    shouldShowShareButton,
    openModal,
    closeModal,
    hideShareButton,
    handleShareClick,
    handleLater,
  };
};

export default useFirstCheerModal;
