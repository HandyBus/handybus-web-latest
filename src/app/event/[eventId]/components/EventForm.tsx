'use client';

import HubButton from './HubButton';
import DateButton from './DateButton';
import BottomBar from './BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useEffect } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import CommonDateStep from './steps/common-steps/CommonDateStep';
import CommonSidoStep from './steps/common-steps/CommonSidoStep';
import ReservationHubsStep from './steps/reservation-steps/ReservationHubsStep';
import ReservationTripTypeStep from './steps/reservation-steps/ReservationTripTypeStep';
import ReservationInfoStep from './steps/reservation-steps/ReservationInfoStep';
import DemandHubInfoStep from './steps/demand-steps/DemandHubInfoStep';
import ExtraSidoInfoStep from './steps/extra-steps/ExtraSidoInfoStep';
import ExtraOpenSidoStep from './steps/extra-steps/ExtraOpenSidoStep';
import DemandHubsStep from './steps/demand-steps/DemandHubsStep';
import ExtraDuplicateHubStep from './steps/extra-steps/ExtraDuplicateHubStep';
import ExtraSeatAlarmStep from './steps/extra-steps/ExtraSeatAlarmStep';
import DemandTripTypeStep from './steps/demand-steps/DemandTripTypeStep';
import useFunnel from '@/hooks/useFunnel';
import { EVENT_STEPS, EVENT_STEPS_TO_TEXT } from '../form.const';

const EventForm = () => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();
  const { Funnel, Step, setStep, stepName } = useFunnel(EVENT_STEPS);

  useEffect(() => {
    setTimeout(() => {
      openBottomSheet();
    }, 0);
  }, []);

  return (
    <section className="px-16 py-24">
      <h6 className="mb-4 text-20 font-700">노선을 확인해 보세요</h6>
      <p className="mb-16 text-16 font-500 text-basic-grey-600">
        셔틀 예약 전 노선별 정류장을 확인하세요!
      </p>
      <form className="flex flex-col gap-8">
        <DateButton />
        <HubButton />
        <BottomBar />
        <BottomSheet
          ref={bottomSheetRef}
          title={EVENT_STEPS_TO_TEXT[stepName].title}
          description={EVENT_STEPS_TO_TEXT[stepName].description}
        >
          <div ref={contentRef}>
            <Funnel>
              {/* 공통 */}
              <Step name="[공통] 일자 선택">
                <CommonDateStep
                  toNextStep={() => setStep('[공통] 시/도 선택')}
                />
              </Step>
              <Step name="[공통] 시/도 선택">
                <CommonSidoStep
                  toDemandHubsStep={() => setStep('[수요조사] 정류장 선택')}
                  toReservationHubsStep={() => setStep('[예약] 정류장 선택')}
                  toExtraSidoInfoStep={() => setStep('[기타] 시/도 정보')}
                />
              </Step>
              {/* 수요조사 */}
              <Step name="[수요조사] 정류장 선택">
                <DemandHubsStep
                  toNextStep={() => setStep('[수요조사] 좌석 선택')}
                />
              </Step>
              <Step name="[수요조사] 좌석 선택">
                <DemandTripTypeStep
                  toNextStep={() => setStep('[수요조사] 정류장 정보')}
                />
              </Step>
              <Step name="[수요조사] 정류장 정보">
                <DemandHubInfoStep />
              </Step>
              {/* 예약 */}
              <Step name="[예약] 정류장 선택">
                <ReservationHubsStep
                  toReservationTripTypeStep={() => setStep('[예약] 좌석 선택')}
                  toExtraDuplicateHubStep={() => setStep('[기타] 복수 노선')}
                  toExtraSeatAlarmStep={() => setStep('[기타] 빈자리 알림')}
                  toDemandHubsStep={() => setStep('[수요조사] 정류장 선택')}
                />
              </Step>
              <Step name="[예약] 좌석 선택">
                <ReservationTripTypeStep
                  toReservationInfoStep={() => setStep('[예약] 예약 정보')}
                  toExtraSeatAlarmStep={() => setStep('[기타] 빈자리 알림')}
                />
              </Step>
              <Step name="[예약] 예약 정보">
                <ReservationInfoStep />
              </Step>
              {/* 기타 */}
              <Step name="[기타] 시/도 정보">
                <ExtraSidoInfoStep
                  toExtraOpenSidoStep={() => setStep('[기타] 예약 가능 시/도')}
                  toDemandHubsStep={() => setStep('[수요조사] 정류장 선택')}
                />
              </Step>
              <Step name="[기타] 예약 가능 시/도">
                <ExtraOpenSidoStep
                  toNextStep={() => setStep('[예약] 정류장 선택')}
                />
              </Step>
              <Step name="[기타] 복수 노선">
                <ExtraDuplicateHubStep
                  toNextStep={() => setStep('[예약] 좌석 선택')}
                />
              </Step>
              <Step name="[기타] 빈자리 알림">
                <ExtraSeatAlarmStep />
              </Step>
            </Funnel>
          </div>
        </BottomSheet>
      </form>
    </section>
  );
};

export default EventForm;
