import Modal from '@/components/modals/Modal';
import CheckCircleIcon from '../icons/check-circle.svg';
import Button from '@/components/buttons/button/Button';
import { useFlow } from '@/stacks';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const CouponIssuedModal = ({ isOpen, closeModal }: Props) => {
  const flow = useFlow();
  const navigateToCouponList = () => {
    flow.push('Coupons', {});
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={
        <div className="flex flex-col items-center justify-center gap-16">
          <CheckCircleIcon />
          <span>쿠폰이 발급되었어요!</span>
        </div>
      }
      titleClassName="text-18 font-700 leading-[140%] text-basic-black text-center"
      description="다음 예약부터 바로 사용할 수 있어요."
      descriptionClassName="text-center text-14"
    >
      <Button type="button" variant="primary" size="large" onClick={closeModal}>
        완료
      </Button>
      <Button
        type="button"
        variant="text"
        size="large"
        onClick={navigateToCouponList}
      >
        쿠폰함 가기
      </Button>
    </Modal>
  );
};

export default CouponIssuedModal;
