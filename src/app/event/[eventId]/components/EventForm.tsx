'use client';

import HubButton from './HubButton';
import DateButton from './DateButton';
import BottomBar from './BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import {
  EVENT_FORM_DEFAULT_VALUES,
  EVENT_STEPS,
  EVENT_STEPS_TO_TEXT,
} from '../form.const';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import {
  getPhaseAndEnabledStatus,
  EventEnabledStatus,
  EventPhase,
} from '@/utils/event.util';
import { Provider as JotaiProvider, useSetAtom } from 'jotai';
import { eventAtom } from '../store/eventAtom';
import { FormProvider, useForm, UseFormGetValues } from 'react-hook-form';
import { BIG_REGIONS_TO_SHORT_NAME } from '@/constants/regions';
import { EventFormValues } from '../form.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dailyEventIdsWithRoutesAtom } from '../store/dailyEventIdsWithRoutesAtom';
import DemandCompleteScreen, {
  DemandCompleteStatus,
} from './demand-complete-screen/DemandCompleteScreen';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { getUserDemands } from '@/services/demand.service';
import { userDemandsAtom } from '../store/userDemandsAtom';
import ExtraHubsInRouteStep from './steps/extra-steps/ExtraHubsInRouteStep';
import { userAlertRequestsAtom } from '../store/userAlertRequestsAtom';
import { getUserAlertRequests } from '@/services/alertRequest.service';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';

interface Props {
  event: EventWithRoutesViewEntity;
  routes: ShuttleRoutesViewEntity[];
}

const EventForm = ({ event, routes }: Props) => {
  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);
  const isDisabled = enabledStatus === 'disabled';
  return (
    <section className={isDisabled ? '' : 'px-16 pb-24'}>
      <JotaiProvider>
        <Form
          event={event}
          routes={routes}
          phase={phase}
          enabledStatus={enabledStatus}
        />
      </JotaiProvider>
    </section>
  );
};

export default EventForm;

interface FormProps {
  event: EventWithRoutesViewEntity;
  routes: ShuttleRoutesViewEntity[];
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
}

const Form = ({ event, routes, phase, enabledStatus }: FormProps) => {
  // 행사, 노선, 수요조사 상태 관리
  const isInitialized = useRef(false);
  const setEvent = useSetAtom(eventAtom);
  const setDailyEventIdWithRoutes = useSetAtom(dailyEventIdsWithRoutesAtom);

  const setUserDemands = useSetAtom(userDemandsAtom);
  const updateUserDemands = async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      return;
    }
    const userDemands = await getUserDemands({
      eventId: event.eventId,
      status: 'OPEN',
    });
    setUserDemands(userDemands.shuttleDemands);
  };

  const setUserAlertRequests = useSetAtom(userAlertRequestsAtom);
  const updateUserAlertRequests = async () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      return;
    }
    const userAlertRequests = await getUserAlertRequests();
    const filteredUserAlertRequests =
      userAlertRequests.shuttleRouteAlertRequests.filter(
        (alertRequest) => alertRequest.shuttleRoute.eventId === event.eventId,
      );
    setUserAlertRequests(filteredUserAlertRequests);
  };

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;
    setEvent(event);
    setDailyEventIdWithRoutes(routes);
    updateUserDemands();
    updateUserAlertRequests();
  }, []);

  // 폼 상태 관리
  const methods = useForm<EventFormValues>({
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  });

  // 퍼널
  const initialStep = EVENT_STEPS[0];
  const { Funnel, Step, setStep, stepName } = useFunnel(
    EVENT_STEPS,
    initialStep,
  );

  // stack 구조로 바텀시트 이동 기록 관리
  const [history, setHistory] = useState<(typeof EVENT_STEPS)[number][]>([]);
  const isBackButtonVisible = history.length > 0;

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

  const onBottomSheetClose = () => {
    setStep(initialStep);
    setHistory([]);
    methods.reset(EVENT_FORM_DEFAULT_VALUES);
  };

  // 바텀시트
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet({
      onClose: onBottomSheetClose,
    });

  // 텍스트
  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useMemo(() => getBottomSheetText(stepName, methods.getValues), [stepName]);

  const isReservationOpen =
    phase === 'reservation' && enabledStatus === 'enabled';
  const { title: inputSectionTitle, description: inputSectionDescription } =
    useMemo(() => getInputSectionText(isReservationOpen), [isReservationOpen]);

  // 수요조사 완료 화면
  const [demandCompleteStatus, setDemandCompleteStatus] =
    useState<DemandCompleteStatus | null>(null);

  // 빈자리 알림 신청 피드백 화면
  const [
    isAlertRequestFeedbackScreenOpen,
    setIsAlertRequestFeedbackScreenOpen,
  ] = useState(false);
  const openAlertRequestFeedbackScreen = () => {
    closeBottomSheet();
    setTimeout(() => {
      setIsAlertRequestFeedbackScreenOpen(true);
    }, 100);
  };
  const closeAlertRequestFeedbackScreen = () => {
    setIsAlertRequestFeedbackScreenOpen(false);
  };

  return (
    <>
      <form className="flex flex-col gap-8">
        {enabledStatus === 'enabled' && (
          <>
            <div className="-mx-16 mb-16 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
            <h6 className="mb-4 text-20 font-700">{inputSectionTitle}</h6>
            <p className="mb-16 text-16 font-500 text-basic-grey-600">
              {inputSectionDescription}
            </p>
            <DateButton disabled={!isReservationOpen} />
            <HubButton disabled={!isReservationOpen} />
          </>
        )}
        <BottomBar
          eventId={event.eventId}
          eventName={event.eventName}
          phase={phase}
          enabledStatus={enabledStatus}
          onClick={openBottomSheet}
        />
        <BottomSheet
          ref={bottomSheetRef}
          title={bottomSheetTitle}
          description={bottomSheetDescription}
          showBackButton={isBackButtonVisible}
          onBack={handleBack}
        >
          <FormProvider {...methods}>
            <div ref={contentRef} className="overflow-y-auto">
              <Funnel>
                {/* 공통 */}
                <Step name="[공통] 일자 선택">
                  <CommonDateStep
                    toNextStep={() => setHistoryAndStep('[공통] 시/도 선택')}
                    phase={phase}
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
                    toNextStep={() =>
                      setHistoryAndStep('[수요조사] 정류장 정보')
                    }
                  />
                </Step>
                <Step name="[수요조사] 정류장 정보">
                  <DemandHubInfoStep
                    closeBottomSheet={closeBottomSheet}
                    setDemandCompleteStatus={setDemandCompleteStatus}
                    updateUserDemands={updateUserDemands}
                  />
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
                  <ReservationInfoStep closeBottomSheet={closeBottomSheet} />
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
                  <ExtraSeatAlarmStep
                    toExtraHubsInRouteStep={() =>
                      setHistoryAndStep('[기타] 노선 내 정류장')
                    }
                    closeBottomSheet={closeBottomSheet}
                    updateUserAlertRequests={updateUserAlertRequests}
                    openAlertRequestFeedbackScreen={
                      openAlertRequestFeedbackScreen
                    }
                  />
                </Step>
                <Step name="[기타] 노선 내 정류장">
                  <ExtraHubsInRouteStep />
                </Step>
              </Funnel>
            </div>
          </FormProvider>
        </BottomSheet>
      </form>
      {demandCompleteStatus !== null && (
        <DemandCompleteScreen
          status={demandCompleteStatus}
          setDemandCompleteStatus={setDemandCompleteStatus}
        />
      )}
      {isAlertRequestFeedbackScreenOpen && (
        <FeedbackScreen
          subject="빈자리 알림 신청"
          closeFeedbackScreen={closeAlertRequestFeedbackScreen}
        />
      )}
    </>
  );
};

const getInputSectionText = (isReservationOpen: boolean) => {
  if (isReservationOpen) {
    return {
      title: '노선을 확인해 보세요',
      description: '노선 내 정류장과 출발 시간을 확인해 보세요.',
    };
  }
  return {
    title: '아직 확정된 노선이 없어요',
    description:
      '지금은 수요조사 기간이에요. 요청이 많은 정류장을 모아 노선을 만들고 있어요.',
  };
};

const getBottomSheetText = (
  stepName: (typeof EVENT_STEPS)[number],
  getValues: UseFormGetValues<EventFormValues>,
) => {
  const text = EVENT_STEPS_TO_TEXT[stepName];

  let titleInput = '';
  let descriptionInput = '';

  switch (stepName) {
    case '[기타] 시/도 정보':
      const sido = getValues('sido');
      titleInput = BIG_REGIONS_TO_SHORT_NAME[sido];
      break;
    case '[기타] 복수 노선':
      const hubsWithInfoForDuplicates = getValues('hubsWithInfoForDuplicates');
      titleInput = hubsWithInfoForDuplicates?.length.toString() ?? '';
      descriptionInput = hubsWithInfoForDuplicates?.[0].name ?? '';
      break;
    case '[기타] 빈자리 알림':
      const selectedRouteForSeatAlarm = getValues('selectedRouteForSeatAlarm');
      descriptionInput = selectedRouteForSeatAlarm?.name ?? '';
      break;
  }

  const title =
    typeof text.title === 'function' ? text.title(titleInput) : text.title;
  const description =
    typeof text.description === 'function'
      ? text.description(descriptionInput)
      : text.description;
  return {
    title,
    description,
  };
};
