import ModalPortal from '@/components/modals/ModalPortal';
import MapStep from './components/steps/MapStep';
import useFunnel from '@/hooks/useFunnel';
import TripTypeStep from './components/steps/TripTypeStep';
import AddressStep from './components/steps/AddressStep';
import ReservationInfoStep from './components/steps/ReservationInfoStep';
import { useState } from 'react';
import { TripType } from '@/types/shuttleRoute.type';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { FormProvider, useForm } from 'react-hook-form';

const HANDY_PARTY_MODAL_STEPS = [
  '방향 선택',
  '주소 입력',
  '지도',
  '예약 확인',
] as const;

export type TripTypeWithoutRoundTrip = Exclude<TripType, 'ROUND_TRIP'>;

export interface AddressSearchResult {
  address: string;
  x: number;
  y: number;
}

export interface HandyPartyModalFormValues {
  tripType: TripTypeWithoutRoundTrip;
  addressSearchResult: AddressSearchResult;
}

interface Props {
  closeModal: () => void;
}

const HandyPartyModal = ({ closeModal }: Props) => {
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel(
    HANDY_PARTY_MODAL_STEPS,
  );

  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false);

  const methods = useForm<HandyPartyModalFormValues>({
    defaultValues: {
      tripType: undefined,
      addressSearchResult: undefined,
    },
  });

  return (
    <ModalPortal>
      <FormProvider {...methods}>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] mx-auto flex h-[100dvh] max-w-500 flex-col bg-basic-white">
          <KakaoMapScript
            onReady={() => setIsKakaoMapScriptLoaded(true)}
            libraries={['services']}
          />
          <Funnel>
            <Step name="방향 선택">
              <TripTypeStep
                onBack={closeModal}
                onNext={() => {
                  if (!isKakaoMapScriptLoaded) {
                    return;
                  }
                  handleNextStep();
                }}
              />
            </Step>
            <Step name="주소 입력">
              <AddressStep onBack={handlePrevStep} onNext={handleNextStep} />
            </Step>
            <Step name="지도">
              <MapStep onBack={handlePrevStep} onNext={handleNextStep} />
            </Step>
            <Step name="예약 확인">
              <ReservationInfoStep onBack={handlePrevStep} />
            </Step>
          </Funnel>
        </div>
      </FormProvider>
    </ModalPortal>
  );
};

export default HandyPartyModal;
