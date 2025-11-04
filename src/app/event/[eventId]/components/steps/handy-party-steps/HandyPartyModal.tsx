import ModalPortal from '@/components/modals/ModalPortal';
import MapStep from './components/modal-steps/MapStep';
import useFunnel from '@/hooks/useFunnel';
import AddressStep from './components/modal-steps/AddressStep';
import ReservationInfoStep from './components/modal-steps/ReservationInfoStep';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { HandyPartyRouteArea } from '@/constants/handyPartyArea.const';
import { EventFormValues } from '../../../form.type';
import { BigRegionsType } from '@/constants/regions';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import ExtraRealNameInputStep from './components/modal-steps/ExtraRealNameInputStep';

export const HANDY_PARTY_MODAL_STEPS = [
  '주소 입력',
  '지도',
  '예약 확인',
  '이름 입력',
] as const;

export interface AddressSearchResult {
  address: string;
  x: number;
  y: number;
}

export interface HandyPartyModalFormValues {
  tripType: TripType;
  addressSearchResult: AddressSearchResult;
  sido: BigRegionsType;
  openSido: BigRegionsType;
  dailyEvent: DailyEventsInEventsViewEntity;
  selectedArea: HandyPartyRouteArea | null;
  userName: string;
  passengerCount: number;
}

interface Props {
  closeModal: () => void;
  closeBottomSheet: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
  possibleHandyPartyAreas: HandyPartyRouteArea[];
  selectedArea: HandyPartyRouteArea | null;
  handleBack: () => void;
}
const HandyPartyModal = ({
  closeModal,
  closeBottomSheet,
  handyPartyRoutes,
  possibleHandyPartyAreas,
  selectedArea,
  handleBack,
}: Props) => {
  const { getValues: getEventFormValues } = useFormContext<EventFormValues>();
  const [dailyEvent, sido, openSido, tripType] = getEventFormValues([
    'dailyEvent',
    'sido',
    'openSido',
    'tripType',
  ]);
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel(
    HANDY_PARTY_MODAL_STEPS,
  );

  const methods = useForm<HandyPartyModalFormValues>({
    defaultValues: {
      tripType,
      addressSearchResult: undefined,
      sido,
      openSido,
      dailyEvent,
      selectedArea,
      passengerCount: 1,
    },
  });

  return (
    <ModalPortal>
      <FormProvider {...methods}>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] mx-auto flex h-[100dvh] max-w-500 flex-col bg-basic-white">
          <Funnel>
            <Step name="주소 입력">
              <AddressStep
                onBack={handleBack}
                onNext={handleNextStep}
                possibleHandyPartyAreas={possibleHandyPartyAreas}
                closeModal={closeModal}
              />
            </Step>
            <Step name="지도">
              <MapStep
                onBack={handlePrevStep}
                onNext={handleNextStep}
                possibleHandyPartyAreas={possibleHandyPartyAreas}
                closeModal={closeModal}
              />
            </Step>
            <Step name="예약 확인">
              <ReservationInfoStep
                onBack={handlePrevStep}
                toExtraRealNameInputStep={handleNextStep}
                handyPartyRoutes={handyPartyRoutes}
                closeModal={closeModal}
                closeBottomSheet={closeBottomSheet}
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
