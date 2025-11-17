import Modal from '@/components/modals/Modal';
import CheckCircleIcon from '../icons/check-circle.svg';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AppLaunchEventCouponDownloadModal = ({ isOpen, closeModal }: Props) => {
  const router = useRouter();
  const navigateToAppLaunchEvent = () => {
    router.push('/app-launch-event');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={
        <div className="flex flex-col items-center justify-center gap-16">
          <CheckCircleIcon />
          <span>할인 쿠폰을 받아가세요!</span>
        </div>
      }
      titleClassName="text-18 font-700 leading-[140%] text-basic-black text-center"
      description="선착순 할인 쿠폰을 제공하고 있어요."
      descriptionClassName="text-center text-14"
    >
      <Button
        type="button"
        variant="primary"
        size="large"
        onClick={navigateToAppLaunchEvent}
      >
        받으러 가기
      </Button>
    </Modal>
  );
};

export default AppLaunchEventCouponDownloadModal;
