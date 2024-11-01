'use client';

import Button from '@/components/buttons/button/Button';
import CustomModal from '../CustomModal';

interface ButtonLabels {
  back: string;
  confirm: string;
}

interface Props {
  title?: string;
  description?: string;
  buttonLabels?: ButtonLabels;
  onConfirm: () => void;
  isOpen: boolean;
  onClosed: () => void;
}

const ConfirmModal = ({
  title = '정말 예약을 취소하시겠습니까?',
  description = '이 작업은 되돌릴 수 없습니다.',
  buttonLabels = { back: '돌아가기', confirm: '예약 취소하기' },
  onConfirm,
  isOpen,
  onClosed,
}: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClosed={onClosed}
      styles="z-50 flex h-[210px] w-280 flex-col items-center justify-center gap-32 rounded-xl bg-white p-24"
    >
      <ConfirmModalContent
        onClosed={onClosed}
        onConfirm={onConfirm}
        title={title}
        description={description}
        buttonLabels={buttonLabels}
      />
    </CustomModal>
  );
};

export default ConfirmModal;

interface ConfirmModalContentProps {
  onConfirm: () => void;
  onClosed: () => void;
  title: string;
  description: string;
  buttonLabels: ButtonLabels;
}

const ConfirmModalContent = ({
  onConfirm,
  onClosed,
  title,
  description,
  buttonLabels,
}: ConfirmModalContentProps) => {
  return (
    <>
      {' '}
      <div>
        <h2 id="modal-title" className="text-22 font-700 leading-[30.8px]">
          {title}
        </h2>
        <p
          id="modal-description"
          className="text-16 font-400 leading-6 text-grey-500"
        >
          {description}
        </p>
      </div>
      <div className="flex w-[100%] gap-8">
        <Button variant="modalSecondary" onClick={onClosed}>
          {buttonLabels.back}
        </Button>
        <Button variant="alert" onClick={onConfirm}>
          {buttonLabels.confirm}
        </Button>
      </div>
    </>
  );
};
