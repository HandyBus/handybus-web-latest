import Image from 'next/image';
import CustomModal from '../CustomModal';
import Button from '../../buttons/button/Button';

interface Props {
  onConfirm: () => void;
  isOpen: boolean;
  onClosed: () => void;
}

const HandyRequestModal = ({ onConfirm, isOpen, onClosed }: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClosed={onClosed}
      styles="fixed top-50 left-50 z-[101] flex h-[393px] w-280 flex-col items-center justify-center gap-12 bg-white px-24 py-20 rounded-[20px]"
    >
      <ModalContent onConfirm={onConfirm} onClosed={onClosed} />
    </CustomModal>
  );
};

export default HandyRequestModal;

interface ModalContentProps {
  onConfirm: () => void;
  onClosed: () => void;
}

const ModalContent = ({ onConfirm, onClosed }: ModalContentProps) => {
  return (
    <>
      <Image
        src={'/rectangle.png'}
        width={40}
        height={40}
        alt="Handy Request icon"
      />
      <h2
        className="text-center text-22 font-700 leading-[30.8px]"
        id="modal-title"
      >
        잠시만요! <br />
        핸디버스의 <span className="text-primary-main">
          든든한 핸디
        </span> <br /> 하실 생각 있으세요?
      </h2>
      <p
        id="modal-description"
        className="text-center text-16 font-400 leading-6 text-grey-500"
      >
        핸디버스를 완벽히 합리적으로 <br />
        이용할 수 있는 기회에요.
        <br /> 안전한 운행을 도와주면, <br /> 다음 이용료가 절반!
      </p>
      <div className="flex w-[100%] flex-col gap-8">
        <Button variant="primary" onClick={onConfirm}>
          핸디 역할 알아보기
        </Button>
        <Button variant="secondary" onClick={onClosed}>
          아니요, 괜찮아요
        </Button>
      </div>
    </>
  );
};
