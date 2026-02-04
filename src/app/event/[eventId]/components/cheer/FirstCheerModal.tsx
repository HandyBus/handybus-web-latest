import Button from '@/components/buttons/button/Button';
import Modal from '@/components/modals/Modal';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onShare: () => void;
  onLater: () => void;
}

const FirstCheerModal = ({ isOpen, closeModal, onShare, onLater }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={<span className="text-22 font-700">첫 응원 완료!</span>}
      description={
        <div className="text-16 font-500 text-basic-grey-600">
          예약 오픈 시, 적용 가능한 할인 금액과 함께 알림을 보내드릴게요. 응원은
          하루 <span className="text-brand-primary-400">최대 2번</span> 참여할
          수 있어요.
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <Button variant="primary" size="large" onClick={onShare}>
          공유하고 한번 더 응원하기
        </Button>
        <Button variant="text" size="large" onClick={onLater}>
          다음에 할게요
        </Button>
      </div>
    </Modal>
  );
};

export default FirstCheerModal;
