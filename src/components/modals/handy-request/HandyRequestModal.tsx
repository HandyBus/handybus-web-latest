import Image from 'next/image';
import CustomModal from '../CustomModal';
import Button from '../../buttons/button/Button';

interface Props {
  onConfirm: () => void;
  isOpen: boolean;
  onClosed: () => void;
  buttonText?: string;
  subButtonText?: string;
}

const HandyRequestModal = ({
  onConfirm,
  isOpen,
  onClosed,
  buttonText,
  subButtonText,
}: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClosed={onClosed}
      styles="fixed top-50 left-50 z-[101] flex h-[393px] w-280 flex-col items-center justify-center gap-12 bg-basic-white px-24 py-20 rounded-[20px]"
    >
      <ModalContent
        onConfirm={onConfirm}
        onClosed={onClosed}
        buttonText={buttonText}
        subButtonText={subButtonText}
      />
    </CustomModal>
  );
};

export default HandyRequestModal;

interface ModalContentProps {
  onConfirm: () => void;
  onClosed: () => void;
  buttonText?: string;
  subButtonText?: string;
}

const ModalContent = ({
  onConfirm,
  onClosed,
  buttonText = '더 알아보기',
  subButtonText = '닫기',
}: ModalContentProps) => {
  return (
    <>
      <Image
        src={'/images/rectangle.png'}
        width={40}
        height={40}
        alt="Handy Request icon"
      />
      <h2
        className="text-center text-22 font-700 leading-[30.8px]"
        id="modal-title"
      >
        한 번쯤 <span className="text-brand-primary-400">핸디</span>를 <br />
        해보고 싶다면?
      </h2>
      <p
        id="modal-description"
        className="text-basic-grey-500 text-center text-16 font-400 leading-6"
      >
        이번 기회에 핸디를 체험해보고 <br />
        특별한 경험을 만들어보세요. <br />
        최대 4만원 상당의 혜택까지 받아갈 <br />수 있어요!
      </p>
      <div className="flex w-[100%] flex-col gap-8">
        <Button variant="primary" onClick={onConfirm} type="button">
          {buttonText}
        </Button>
        <Button variant="tertiary" onClick={onClosed} type="button">
          {subButtonText}
        </Button>
      </div>
    </>
  );
};
