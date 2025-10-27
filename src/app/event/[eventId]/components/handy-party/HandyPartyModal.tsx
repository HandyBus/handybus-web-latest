import ModalPortal from '@/components/modals/ModalPortal';
import MapStep from './components/steps/MapStep';
import useFunnel from '@/hooks/useFunnel';
import TripTypeStep from './components/steps/TripTypeStep';
import AddressStep from './components/steps/AddressStep';
import ReservationInfoStep from './components/steps/ReservationInfoStep';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { FormProvider, useForm } from 'react-hook-form';
import { HandyPartyRouteArea } from '@/constants/handyPartyArea.const';
import ExtraRealNameInputStep from './components/steps/ExtraRealNameInputStep';

const HANDY_PARTY_MODAL_STEPS = [
  '방향 선택',
  '주소 입력',
  '지도',
  '예약 확인',
  '이름 입력',
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
  userName: string;
  passengerCount: number;
}

interface Props {
  closeModal: () => void;
  closeBottomSheet: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
}

const HandyPartyModal = ({
  closeModal,
  closeBottomSheet,
  handyPartyRoutes,
}: Props) => {
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel(
    HANDY_PARTY_MODAL_STEPS,
  );

  const methods = useForm<HandyPartyModalFormValues>({
    defaultValues: {
      tripType: undefined,
      addressSearchResult: undefined,
      passengerCount: 1,
    },
  });

  const possibleHandyPartyAreas = handyPartyRoutes.reduce((acc, route) => {
    // 어드민에서 핸디팟 노선들을 형식에 맞추어 만들어야함
    const area = route.name.split('_')[1] as HandyPartyRouteArea;
    const existingArea = acc.find((a) => a === area);
    if (existingArea) {
      return acc;
    } else {
      return [...acc, area];
    }
  }, [] as HandyPartyRouteArea[]);

  return (
    <ModalPortal>
      <FormProvider {...methods}>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] mx-auto flex h-[100dvh] max-w-500 flex-col bg-basic-white">
          <Funnel>
            <Step name="방향 선택">
              <TripTypeStep
                onBack={closeModal}
                onNext={handleNextStep}
                handyPartyRoutes={handyPartyRoutes}
              />
            </Step>
            <Step name="주소 입력">
              <AddressStep
                onBack={handlePrevStep}
                onNext={handleNextStep}
                possibleHandyPartyAreas={possibleHandyPartyAreas}
                handyPartyRoutes={handyPartyRoutes}
              />
            </Step>
            <Step name="지도">
              <MapStep
                onBack={handlePrevStep}
                onNext={handleNextStep}
                possibleHandyPartyAreas={possibleHandyPartyAreas}
              />
            </Step>
            <Step name="예약 확인">
              <ReservationInfoStep
                onBack={handlePrevStep}
                toExtraRealNameInputStep={handleNextStep}
                handyPartyRoutes={handyPartyRoutes}
                closeBottomSheet={closeBottomSheet}
                closeModal={closeModal}
              />
            </Step>
            <Step name="이름 입력">
              <ExtraRealNameInputStep
                onBack={handlePrevStep}
                handyPartyRoutes={handyPartyRoutes}
                closeBottomSheet={closeBottomSheet}
                closeModal={closeModal}
              />
            </Step>
          </Funnel>
        </div>
      </FormProvider>
    </ModalPortal>
  );
};

export default HandyPartyModal;
