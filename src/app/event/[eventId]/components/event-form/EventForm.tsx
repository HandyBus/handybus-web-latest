'use client';

import BottomBar from './components/BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { EVENT_FORM_DEFAULT_VALUES, EVENT_STEPS } from '../../form.const';
import { EventsViewEntity } from '@/types/event.type';
import {
  getPhaseAndEnabledStatus,
  EventEnabledStatus,
  EventPhase,
} from '@/utils/event.util';
import { FormProvider, useForm } from 'react-hook-form';
import { EventFormValues } from '../../form.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import DemandCompleteScreen, {
  DemandCompleteStatus,
} from '../demand-complete-screen/DemandCompleteScreen';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import Button from '@/components/buttons/button/Button';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import useBottomSheetText from './hooks/useBottomSheetText';
import useHistory from './hooks/useHistory';
import useEventInitialization from './hooks/useEventInitialization';
import useAlertFeedBackScreen from './hooks/useAlertFeedBackScreen';
import StepComponent from '../steps/StepComponent';
import {
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../store/selectedHubWithInfoForDetailViewAtom';
import { useAtom } from 'jotai';
import useDemandTracking from '@/hooks/analytics/useDemandTracking';
import {
  checkIsHandyParty,
  createShortAvailableHandyPartyAreaGuideString,
} from '@/utils/handyParty.util';
import { HANDY_PARTY_AREA_GUIDE_ID } from '../EventInfo';
import ShareBottomSheet from './components/ShareBottomSheet';
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';

interface Props {
  event: EventsViewEntity;
  isNoDemandRewardCouponEvent: boolean;
}

const EventForm = ({ event, isNoDemandRewardCouponEvent }: Props) => {
  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);
  const isDisabled = enabledStatus === 'disabled';

  const { data: shuttleRoutesPages } = useGetShuttleRoutesOfEventWithPagination(
    {
      eventId: event.eventId,
      status: 'OPEN',
    },
    {
      enabled: event.eventHasOpenRoute,
    },
  );
  const shuttleRoutes = useMemo(
    () => shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [],
    [shuttleRoutesPages],
  );
  const isShuttleRoutesLoading =
    event.eventHasOpenRoute && shuttleRoutes.length === 0;

  if (isShuttleRoutesLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
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
    <section className={isDisabled ? '' : 'px-16'}>
      <Content
        event={event}
        shuttleRoutes={shuttleRoutes}
        phase={phase}
        enabledStatus={enabledStatus}
        isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
      />
    </section>
  );
};

export default EventForm;

interface ContentProps {
  event: EventsViewEntity;
  shuttleRoutes: ShuttleRoutesViewEntity[];
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
  isNoDemandRewardCouponEvent: boolean;
}

const Content = ({
  event,
  shuttleRoutes,
  phase,
  enabledStatus,
  isNoDemandRewardCouponEvent,
}: ContentProps) => {
  const { updateUserDemands, updateUserAlertRequests } = useEventInitialization(
    {
      event,
      shuttleRoutes,
    },
  );

  const methods = useForm<EventFormValues>({
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
    mode: 'onBlur',
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

  const resetBottomSheet = () => {
    resetHistory();
    setStep(initialStep);
    methods.reset(EVENT_FORM_DEFAULT_VALUES);
  };

  const [
    selectedHubWithInfoForDetailView,
    setSelectedHubWithInfoForDetailView,
  ] = useAtom(selectedHubWithInfoForDetailViewAtom);

  const [isCheckRouteDetailViewFlow, setIsCheckRouteDetailViewFlow] = useAtom(
    isCheckRouteDetailViewFlowAtom,
  );

  const [isCheckRouteDetailFlowViewed, setIsCheckRouteDetailFlowViewed] =
    useState(false);

  const handleOpenBottomSheet = () => {
    // 수요조사 단계에서 바텀시트 열기 시 추적
    if (phase === 'demand') {
      trackEnterDemand();
    }

    // 예약 단계에서 바텀시트 열기 시 추적
    if (phase === 'reservation') {
      trackEnterReservation();
    }

    if (
      isCheckRouteDetailViewFlow &&
      !isCheckRouteDetailFlowViewed &&
      selectedHubWithInfoForDetailView
    ) {
      setHistoryAndStep('[예약] 좌석 선택');
      setIsCheckRouteDetailFlowViewed(true);
      openBottomSheet();
    } else {
      resetBottomSheet();
      setIsCheckRouteDetailViewFlow(false);
      setIsCheckRouteDetailFlowViewed(false);
      setSelectedHubWithInfoForDetailView(null);
      openBottomSheet();
    }
  };

  const onBottomSheetClose = () => {
    if (isCheckRouteDetailViewFlow && !isCheckRouteDetailFlowViewed) {
      return;
    }
    if (isCheckRouteDetailViewFlow && isCheckRouteDetailFlowViewed) {
      setIsCheckRouteDetailViewFlow(false);
      setIsCheckRouteDetailFlowViewed(false);
      setSelectedHubWithInfoForDetailView(null);
    }
    resetBottomSheet();
  };

  const {
    bottomSheetRef,
    contentRef,
    openBottomSheet,
    closeBottomSheet,
    isOpen,
  } = useBottomSheet({
    onClose: onBottomSheetClose,
  });

  // 플로우별 조건부 추적 (훅은 항상 호출하되 내부에서 조건 처리)
  const demandTrackingParams = useMemo(
    () => ({
      eventId: event.eventId,
      eventName: event.eventName,
      isBottomSheetOpen: isOpen,
      isActive: phase === 'demand',
    }),
    [event.eventId, event.eventName, isOpen, phase],
  );

  const reservationTrackingParams = useMemo(
    () => ({
      eventId: event.eventId,
      eventName: event.eventName,
      isBottomSheetOpen: isOpen,
      isActive: phase === 'reservation',
    }),
    [event.eventId, event.eventName, isOpen, phase],
  );

  const { trackEnterDemand, trackCompleteDemand, setDemandTrackingStep } =
    useDemandTracking(demandTrackingParams);

  const { trackEnterReservation, setReservationTrackingStep } =
    useReservationTracking(reservationTrackingParams);

  useEffect(() => {
    // 현재 플로우에 따라서만 스텝 추적
    if (phase === 'demand') {
      setDemandTrackingStep(stepName);
    } else if (phase === 'reservation') {
      setReservationTrackingStep(stepName);
    }
  }, [stepName, phase, setDemandTrackingStep, setReservationTrackingStep]);

  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useBottomSheetText({ stepName, getValues: methods.getValues });

  const [demandCompleteStatus, setDemandCompleteStatus] =
    useState<DemandCompleteStatus | null>(null);

  const {
    isAlertRequestFeedbackScreenOpen,
    openAlertRequestFeedbackScreen,
    closeAlertRequestFeedbackScreen,
  } = useAlertFeedBackScreen({ closeBottomSheet });

  // 핸디팟 노선 개설 가능 지역 가이드 문구 추가
  const handyPartyRoutes = shuttleRoutes.filter((route) =>
    checkIsHandyParty(route),
  );
  const handyPartyAreaGuideString =
    handyPartyRoutes.length > 0
      ? createShortAvailableHandyPartyAreaGuideString(handyPartyRoutes)
      : null;
  const setHandyPartyAreaGuide = useCallback(() => {
    const guideElement = document.getElementById(HANDY_PARTY_AREA_GUIDE_ID);
    if (!handyPartyAreaGuideString || !guideElement) {
      return;
    }

    guideElement.textContent = handyPartyAreaGuideString;
    guideElement.classList.remove('hidden');
  }, [handyPartyAreaGuideString]);
  useEffect(() => {
    setHandyPartyAreaGuide();
  }, [setHandyPartyAreaGuide, handyPartyAreaGuideString]);

  const {
    bottomSheetRef: shareBottomSheetRef,
    openBottomSheet: openShareBottomSheet,
    closeBottomSheet: closeShareBottomSheet,
  } = useBottomSheet();

  const [demandCount, setDemandCount] = useState(0);

  return (
    <>
      <ShareBottomSheet
        bottomSheetRef={shareBottomSheetRef}
        eventId={event.eventId}
        eventName={event.eventName}
        closeBottomSheet={closeShareBottomSheet}
        className="z-[101]"
      />
      <form className="flex flex-col gap-8">
        <BottomBar
          eventId={event.eventId}
          phase={phase}
          enabledStatus={enabledStatus}
          onClick={handleOpenBottomSheet}
          openShareBottomSheet={openShareBottomSheet}
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
                {EVENT_STEPS.map((stepName) => (
                  <Step key={stepName} name={stepName}>
                    <StepComponent
                      stepName={stepName}
                      setHistoryAndStep={setHistoryAndStep}
                      closeBottomSheet={closeBottomSheet}
                      setDemandCompleteStatus={setDemandCompleteStatus}
                      updateUserDemands={updateUserDemands}
                      updateUserAlertRequests={updateUserAlertRequests}
                      openAlertRequestFeedbackScreen={
                        openAlertRequestFeedbackScreen
                      }
                      phase={phase}
                      trackCompleteDemand={trackCompleteDemand}
                      setDemandCount={setDemandCount}
                      isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
                    />
                  </Step>
                ))}
              </Funnel>
            </div>
          </FormProvider>
        </BottomSheet>
      </form>
      {demandCompleteStatus !== null && (
        <DemandCompleteScreen
          status={demandCompleteStatus ?? 'success'}
          setDemandCompleteStatus={setDemandCompleteStatus}
          demandCount={demandCount}
          openShareBottomSheet={openShareBottomSheet}
          isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
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
