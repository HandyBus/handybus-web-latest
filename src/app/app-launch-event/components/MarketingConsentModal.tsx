import Modal from '@/components/modals/Modal';
import Button from '@/components/buttons/button/Button';
import CheckIcon from '../icons/check.svg';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onNext: () => void;
}

const MarketingConsentModal = ({ isOpen, closeModal, onNext }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="마케팅 수신 동의가 필요해요"
      titleClassName="text-18 font-700 leading-[140%] text-basic-black text-center"
      description={
        <div>
          쿠폰은 마케팅 수신자 대상자에게 제공되고 있어요.
          <br />
          핸디버스는 꼭 필요한 정보만 전달해드릴게요.
        </div>
      }
      descriptionClassName="text-center text-14"
    >
      <button className="mb-16 flex w-full items-center justify-between rounded-6 bg-basic-grey-50 px-16 py-12">
        <span className="text-14 font-600 underline underline-offset-2">
          마케팅 활용/광고성 정보 수신 동의
        </span>
        <CheckIcon />
      </button>
      <Button type="button" variant="primary" size="large" onClick={onNext}>
        확인
      </Button>
      <Button type="button" variant="text" size="large" onClick={closeModal}>
        괜찮아요
      </Button>
    </Modal>
  );
};

export default MarketingConsentModal;
