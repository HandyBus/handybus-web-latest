'use client';

import HubButton from './components/HubButton';
import DateButton from './components/DateButton';
import BottomBar from './components/BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { EVENT_FORM_DEFAULT_VALUES, EVENT_STEPS } from '../../form.const';
import { EventWithRoutesViewEntity } from '@/types/event.type';
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
import useInputSectionText from './hooks/useInputSectionText';
import useHistory from './hooks/useHistory';
import useEventInitialization from './hooks/useEventInitialization';
import useAlertFeedBackScreen from './hooks/useAlertFeedBackScreen';
import StepComponent from '../steps/StepComponent';
import {
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../store/selectedHubWithInfoForDetailViewAtom';
import { useAtom } from 'jotai';
import Skeleton from 'react-loading-skeleton';
import useDemandTracking from '@/hooks/analytics/useDemandTracking';
import {
  checkIsHandyParty,
  createShortAvailableHandyPartyAreaGuideString,
} from '@/utils/handyParty.util';
import { HANDY_PARTY_AREA_GUIDE_ID } from '../EventInfo';
import ShareBottomSheet from './components/ShareBottomSheet';

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
      <>
        <div className="flex flex-col gap-8 px-16 pb-24">
          <div className="-mx-16 mb-16 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
          <Skeleton width="35%" height={30} />
          <Skeleton width="55%" height={24} className="mb-16" />
          <Skeleton width="100%" height={78} />
          <Skeleton width="100%" height={78} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
          <Button
            variant="secondary"
            size="medium"
            type="button"
            disabled={true}
          />
          <Button
            variant="primary"
            size="large"
            type="button"
            disabled={true}
          />
        </div>
      </>
    );
  }

  return (
    <section className={isDisabled ? '' : 'px-16 pb-24'}>
      <Content
        event={event}
        shuttleRoutes={shuttleRoutes}
        phase={phase}
        enabledStatus={enabledStatus}
      />
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

  const handleInputSectionClick = () => {
    resetBottomSheet();
    setIsCheckRouteDetailViewFlow(true);
    setIsCheckRouteDetailFlowViewed(false);
    setSelectedHubWithInfoForDetailView(null);
    openBottomSheet();
  };

  const handleOpenBottomSheet = () => {
    // 수요조사 단계에서 바텀시트 열기 시 추적
    if (phase === 'demand') {
      trackEnterDemand();
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

  const { trackEnterDemand, trackCompleteDemand, setDemandTrackingStep } =
    useDemandTracking({
      eventId: event.eventId,
      eventName: event.eventName,
      isBottomSheetOpen: isOpen,
    });

  useEffect(() => {
    setDemandTrackingStep(stepName);
  }, [stepName, setDemandTrackingStep]);

  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useBottomSheetText({ stepName, getValues: methods.getValues });

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
        {enabledStatus === 'enabled' && (
          <>
            <div className="-mx-16 mb-16 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
            <h3 className="mb-4 text-20 font-700">{inputSectionTitle}</h3>
            <p className="mb-16 text-16 font-500 text-basic-grey-600">
              {inputSectionDescription}
            </p>
            <DateButton
              disabled={!isReservationOpen}
              onClick={handleInputSectionClick}
            />
            <HubButton
              disabled={!isReservationOpen}
              onClick={handleInputSectionClick}
            />
          </>
        )}
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
          status={demandCompleteStatus}
          setDemandCompleteStatus={setDemandCompleteStatus}
          demandCount={demandCount}
          openShareBottomSheet={openShareBottomSheet}
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
