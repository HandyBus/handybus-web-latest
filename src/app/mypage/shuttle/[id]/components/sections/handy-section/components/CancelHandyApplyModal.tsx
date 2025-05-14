import Modal from '@/components/modals/Modal';
import useCancelApplyHandy from '../hooks/useCancelApplyHandy';

interface Props {
  reservationId: string;
  isOpen: boolean;
  closeModal: () => void;
}

const CancelHandyApplyModal = ({
  reservationId,
  isOpen,
  closeModal,
}: Props) => {
  const { mutate: cancelApplyHandy, isPending } = useCancelApplyHandy(
    reservationId,
    {
      onSuccess: () => {
        closeModal();
      },
    },
  );
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="핸디 지원 취소"
      description={
        <p>
          지금 취소하면 지원 혜택도 함께 사라져요.
          <br />
          정말 핸디를 그만두시겠어요?
        </p>
      }
      primaryButton={{
        text: '계속 할게요',
        variant: 'tertiary',
        onClick: () => {
          closeModal();
        },
        disabled: isPending,
      }}
      secondaryButton={{
        text: '취소할게요',
        variant: 's-destructive',
        onClick: cancelApplyHandy,
        disabled: isPending,
      }}
    />
  );
};

export default CancelHandyApplyModal;
