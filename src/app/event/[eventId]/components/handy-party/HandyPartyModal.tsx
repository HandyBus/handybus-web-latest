import ModalPortal from '@/components/modals/ModalPortal';
import MapStep from './components/steps/MapStep';
import useFunnel from '@/hooks/useFunnel';

const HANDY_PARTY_MODAL_STEPS = ['map', 'temp'] as const;

interface Props {
  closeModal: () => void;
}

const HandyPartyModal = ({ closeModal }: Props) => {
  const { Funnel, Step } = useFunnel(HANDY_PARTY_MODAL_STEPS);

  return (
    <ModalPortal>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] mx-auto flex max-w-500 flex-col bg-basic-white">
        <Funnel>
          <Step name="map">
            <MapStep onBack={closeModal} />
          </Step>
          <Step name="temp">
            <MapStep onBack={closeModal} />
          </Step>
        </Funnel>
      </div>
    </ModalPortal>
  );
};

export default HandyPartyModal;
