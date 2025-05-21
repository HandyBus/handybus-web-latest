'use client';

import HubButton from '../HubButton';
import DateButton from '../DateButton';
import BottomBar from '../BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useMemo, useState } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import CommonDateStep from '../steps/common-steps/CommonDateStep';
import CommonSidoStep from '../steps/common-steps/CommonSidoStep';
import ReservationHubsStep from '../steps/reservation-steps/ReservationHubsStep';
import ReservationTripTypeStep from '../steps/reservation-steps/ReservationTripTypeStep';
import ReservationInfoStep from '../steps/reservation-steps/ReservationInfoStep';
import DemandHubInfoStep from '../steps/demand-steps/DemandHubInfoStep';
import ExtraSidoInfoStep from '../steps/extra-steps/ExtraSidoInfoStep';
import ExtraOpenSidoStep from '../steps/extra-steps/ExtraOpenSidoStep';
import DemandHubsStep from '../steps/demand-steps/DemandHubsStep';
import ExtraDuplicateHubStep from '../steps/extra-steps/ExtraDuplicateHubStep';
import ExtraSeatAlarmStep from '../steps/extra-steps/ExtraSeatAlarmStep';
import DemandTripTypeStep from '../steps/demand-steps/DemandTripTypeStep';
import useFunnel from '@/hooks/useFunnel';
import { EVENT_FORM_DEFAULT_VALUES, EVENT_STEPS } from '../../form.const';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import {
  getPhaseAndEnabledStatus,
  EventEnabledStatus,
  EventPhase,
} from '@/utils/event.util';
import { Provider as JotaiProvider } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { EventFormValues } from '../../form.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import DemandCompleteScreen, {
  DemandCompleteStatus,
} from '../demand-complete-screen/DemandCompleteScreen';
import ExtraHubsInRouteStep from '../steps/extra-steps/ExtraHubsInRouteStep';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import Button from '@/components/buttons/button/Button';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import useBottomSheetText from './hooks/useBottomSheetText';
import useInputSectionText from './hooks/useInputSectionText';
import useHistory from './hooks/useHistory';
import useEventInitialization from './hooks/useEventInitialization';
import useAlertFeedBackScreen from './hooks/useAlertFeedBackScreen';

interface Props {
  event: EventWithRoutesViewEntity;
}

const EventForm = ({ event }: Props) => {
  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);
  const isDisabled = enabledStatus === 'disabled';

  const { data: shuttleRoutesPages } = useGetShuttleRoutesOfEventWithPagination(
    {
      eventId: event.eventId,
      status: 'OPEN',
    },
    {
      enabled: event.hasOpenRoute,
    },
  );
  const shuttleRoutes = useMemo(
    () => shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [],
    [shuttleRoutesPages],
  );
  const isShuttleRoutesLoading =
    event.hasOpenRoute && shuttleRoutes.length === 0;

  if (isShuttleRoutesLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button
          variant="secondary"
          size="medium"
          type="button"
          disabled={true}
        />
        <Button variant="primary" size="large" type="button" disabled={true} />
      </div>
    );
  }

  return (
    <section className={isDisabled ? '' : 'px-16 pb-24'}>
      <JotaiProvider>
        <Content
          event={event}
          shuttleRoutes={shuttleRoutes}
          phase={phase}
          enabledStatus={enabledStatus}
        />
      </JotaiProvider>
    </section>
  );
};

export default EventForm;

interface ContentProps {
  event: EventWithRoutesViewEntity;
  shuttleRoutes: ShuttleRoutesViewEntity[];
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
}

const Content = ({
  event,
  shuttleRoutes,
  phase,
  enabledStatus,
}: ContentProps) => {
  const { updateUserDemands, updateUserAlertRequests } = useEventInitialization(
    {
      event,
      shuttleRoutes,
    },
  );

  const methods = useForm<EventFormValues>({
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  });

  const initialStep = EVENT_STEPS[0];
  const { Funnel, Step, setStep, stepName } = useFunnel(
    EVENT_STEPS,
    initialStep,
  );

  const { isHistoryAvailable, setHistoryAndStep, handleBack, resetHistory } =
    useHistory({
      stepName,
      setStep,
    });

  const onBottomSheetClose = () => {
    resetHistory();
    setStep(initialStep);
    methods.reset(EVENT_FORM_DEFAULT_VALUES);
  };

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet({
      onClose: onBottomSheetClose,
    });

  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useBottomSheetText(stepName);

  const isReservationOpen =
    phase === 'reservation' && enabledStatus === 'enabled';
  const { title: inputSectionTitle, description: inputSectionDescription } =
    useInputSectionText(isReservationOpen);

  const [demandCompleteStatus, setDemandCompleteStatus] =
    useState<DemandCompleteStatus | null>(null);

  const {
    isAlertRequestFeedbackScreenOpen,
    openAlertRequestFeedbackScreen,
    closeAlertRequestFeedbackScreen,
  } = useAlertFeedBackScreen({ closeBottomSheet });

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
          showBackButton={isHistoryAvailable}
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
