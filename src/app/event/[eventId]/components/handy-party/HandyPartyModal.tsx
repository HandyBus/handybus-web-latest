import ModalPortal from '@/components/modals/ModalPortal';
import MapStep from './components/steps/MapStep';
import useFunnel from '@/hooks/useFunnel';
import TripTypeStep from './components/steps/TripTypeStep';
import AddressStep from './components/steps/AddressStep';
import ReservationInfoStep from './components/steps/ReservationInfoStep';

const HANDY_PARTY_MODAL_STEPS = [
  '방향 선택',
  '주소 입력',
  '지도',
  '예약 확인',
] as const;

interface Props {
  closeModal: () => void;
}

const HandyPartyModal = ({ closeModal }: Props) => {
  const { Funnel, Step, handleNextStep } = useFunnel(HANDY_PARTY_MODAL_STEPS);

  return (
    <ModalPortal>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] mx-auto flex max-w-500 flex-col bg-basic-white">
        <Funnel>
          <Step name="방향 선택">
            <TripTypeStep onBack={closeModal} onNext={handleNextStep} />
          </Step>
          <Step name="주소 입력">
            <AddressStep onBack={closeModal} onNext={handleNextStep} />
          </Step>
          <Step name="지도">
            <MapStep onBack={closeModal} />
          </Step>
          <Step name="예약 확인">
            <ReservationInfoStep onBack={closeModal} />
          </Step>
        </Funnel>
      </div>
    </ModalPortal>
  );
};

export default HandyPartyModal;
