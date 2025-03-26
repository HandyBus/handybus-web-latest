'use client';

import HubButton from './HubButton';
import DateButton from './DateButton';
import BottomBar from './BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useEffect, useMemo, useState } from 'react';
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
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { checkIsReservationOpen } from '../event.util';
import { Provider as JotaiProvider, useSetAtom } from 'jotai';
import { eventAtom } from '../store/eventAtom';

interface Props {
  event: EventWithRoutesViewEntity;
}

const EventForm = ({ event }: Props) => {
  const isReservationOpen = checkIsReservationOpen(event);
  const { title, description } = useMemo(
    () => getInputSectionText(isReservationOpen),
    [isReservationOpen],
  );

  return (
    <section className="px-16 py-24">
      <h6 className="mb-4 text-20 font-700">{title}</h6>
      <p className="mb-16 text-16 font-500 text-basic-grey-600">
        {description}
      </p>
      <JotaiProvider>
        <Form event={event} isReservationOpen={isReservationOpen} />
      </JotaiProvider>
    </section>
  );
};

export default EventForm;

interface FormProps {
  event: EventWithRoutesViewEntity;
  isReservationOpen: boolean;
}

const Form = ({ event, isReservationOpen }: FormProps) => {
  const setEvent = useSetAtom(eventAtom);
  useEffect(() => {
    setEvent(event);
  }, []);

  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();
  const { Funnel, Step, setStep, stepName } = useFunnel(EVENT_STEPS);

  useEffect(() => {
    setTimeout(() => {
      openBottomSheet();
    }, 0);
  }, []);

  // stack 구조로 바텀시트 이동 기록 관리
  const [history, setHistory] = useState<(typeof EVENT_STEPS)[number][]>([]);

  const setHistoryAndStep = (nextStep: (typeof EVENT_STEPS)[number]) => {
    const currStep = stepName;
    setHistory((prev) => [currStep, ...prev]);
    setStep(nextStep);
  };

  const handleBack = () => {
    const step = history[0];
    if (!step) {
      return;
    }
    setStep(step);
    setHistory((prev) => prev.slice(1));
  };

  const isBackButtonVisible = history.length > 0;

  return (
    <form className="flex flex-col gap-8">
      <DateButton disabled={!isReservationOpen} />
      <HubButton disabled={!isReservationOpen} />
      <BottomBar isReservationOpen={isReservationOpen} />
      <BottomSheet
        ref={bottomSheetRef}
        title={EVENT_STEPS_TO_TEXT[stepName].title}
        description={EVENT_STEPS_TO_TEXT[stepName].description}
        showBackButton={isBackButtonVisible}
        onBack={handleBack}
      >
        <div ref={contentRef}>
          <Funnel>
            {/* 공통 */}
            <Step name="[공통] 일자 선택">
              <CommonDateStep
                toNextStep={() => setHistoryAndStep('[공통] 시/도 선택')}
              />
            </Step>
            <Step name="[공통] 시/도 선택">
              <CommonSidoStep
                toDemandHubsStep={() =>
                  setHistoryAndStep('[수요조사] 정류장 선택')
                }
                toReservationHubsStep={() =>
                  setHistoryAndStep('[예약] 정류장 선택')
                }
                toExtraSidoInfoStep={() =>
                  setHistoryAndStep('[기타] 시/도 정보')
                }
              />
            </Step>
            {/* 수요조사 */}
            <Step name="[수요조사] 정류장 선택">
              <DemandHubsStep
                toNextStep={() => setHistoryAndStep('[수요조사] 좌석 선택')}
              />
            </Step>
            <Step name="[수요조사] 좌석 선택">
              <DemandTripTypeStep
                toNextStep={() => setHistoryAndStep('[수요조사] 정류장 정보')}
              />
            </Step>
            <Step name="[수요조사] 정류장 정보">
              <DemandHubInfoStep />
            </Step>
            {/* 예약 */}
            <Step name="[예약] 정류장 선택">
              <ReservationHubsStep
                toReservationTripTypeStep={() =>
                  setHistoryAndStep('[예약] 좌석 선택')
                }
                toExtraDuplicateHubStep={() =>
                  setHistoryAndStep('[기타] 복수 노선')
                }
                toExtraSeatAlarmStep={() =>
                  setHistoryAndStep('[기타] 빈자리 알림')
                }
                toDemandHubsStep={() =>
                  setHistoryAndStep('[수요조사] 정류장 선택')
                }
              />
            </Step>
            <Step name="[예약] 좌석 선택">
              <ReservationTripTypeStep
                toReservationInfoStep={() =>
                  setHistoryAndStep('[예약] 예약 정보')
                }
                toExtraSeatAlarmStep={() =>
                  setHistoryAndStep('[기타] 빈자리 알림')
                }
              />
            </Step>
            <Step name="[예약] 예약 정보">
              <ReservationInfoStep />
            </Step>
            {/* 기타 */}
            <Step name="[기타] 시/도 정보">
              <ExtraSidoInfoStep
                toExtraOpenSidoStep={() =>
                  setHistoryAndStep('[기타] 예약 가능 시/도')
                }
                toDemandHubsStep={() =>
                  setHistoryAndStep('[수요조사] 정류장 선택')
                }
              />
            </Step>
            <Step name="[기타] 예약 가능 시/도">
              <ExtraOpenSidoStep
                toNextStep={() => setHistoryAndStep('[예약] 정류장 선택')}
              />
            </Step>
            <Step name="[기타] 복수 노선">
              <ExtraDuplicateHubStep
                toReservationTripTypeStep={() =>
                  setHistoryAndStep('[예약] 좌석 선택')
                }
                toExtraSeatAlarmStep={() =>
                  setHistoryAndStep('[기타] 빈자리 알림')
                }
              />
            </Step>
            <Step name="[기타] 빈자리 알림">
              <ExtraSeatAlarmStep />
            </Step>
          </Funnel>
        </div>
      </BottomSheet>
    </form>
  );
};

const getInputSectionText = (isReservationOpen: boolean) => {
  if (isReservationOpen) {
    return {
      title: '노선을 확인해 보세요',
      description: '셔틀 예약 전 노선별 정류장을 확인하세요!',
    };
  }
  return {
    title: '확정된 노선이 없어요',
    description:
      '지금은 수요조사 기간이에요. 수요조사가 끝나면 요청이 많은 정류장을 선정해서 노선을 만들어 드릴게요.',
  };
};
