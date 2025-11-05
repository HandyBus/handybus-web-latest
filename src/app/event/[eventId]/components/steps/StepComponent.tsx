import CommonDateStep from './common-steps/CommonDateStep';
import CommonSidoStep from './common-steps/CommonSidoStep';
import DemandHubsStep from './demand-steps/DemandHubsStep';
import DemandTripTypeStep from './demand-steps/DemandTripTypeStep';
import DemandHubInfoStep from './demand-steps/DemandHubInfoStep';
import ReservationHubsStep from './reservation-steps/ReservationHubsStep';
import ReservationTripTypeStep from './reservation-steps/ReservationTripTypeStep';
import ReservationInfoStep from './reservation-steps/ReservationInfoStep';
import ExtraSidoInfoStep from './extra-steps/ExtraSidoInfoStep';
import ExtraOpenSidoStep from './extra-steps/ExtraOpenSidoStep';
import ExtraDuplicateHubStep from './extra-steps/ExtraDuplicateHubStep';
import ExtraSeatAlarmStep from './extra-steps/ExtraSeatAlarmStep';
import { EventPhase } from '@/utils/event.util';
import { EVENT_STEPS } from '../../form.const';
import { ReactNode } from 'react';
import { DemandCompleteStatus } from '../demand-complete-screen/DemandCompleteScreen';
import ExtraSelectProductStep from './extra-steps/ExtraSelectProductStep';
import ExtraRealNameInputStep from './extra-steps/ExtraRealNameInputStep';
import HandyPartyTripTypeStep from './handy-party-steps/HandyPartyTripTypeStep';
import HandyPartySiGunGuStep from './handy-party-steps/HandyPartySiGunGuStep';

interface Props {
  stepName: (typeof EVENT_STEPS)[number];
  setHistoryAndStep: (step: (typeof EVENT_STEPS)[number]) => void;
  handleBack: () => void;
  closeBottomSheet: () => void;
  setDemandCompleteStatus: (status: DemandCompleteStatus) => void;
  updateUserDemands: () => void;
  updateUserAlertRequests: () => void;
  openAlertRequestFeedbackScreen: () => void;
  phase: EventPhase;
  trackCompleteDemand: (
    selectedHub: string,
    tripType: string,
    eventDate: string,
  ) => void;
  setDemandCount: (count: number) => void;
}

const StepComponent = ({
  stepName,
  setHistoryAndStep,
  handleBack,
  closeBottomSheet,
  setDemandCompleteStatus,
  updateUserDemands,
  updateUserAlertRequests,
  openAlertRequestFeedbackScreen,
  phase,
  trackCompleteDemand,
  setDemandCount,
}: Props) => {
  const stepComponents: Record<(typeof EVENT_STEPS)[number], ReactNode> = {
    // 공통
    '[공통] 일자 선택': (
      <CommonDateStep
        toNextStep={() => {
          setHistoryAndStep('[공통] 시/도 선택');
        }}
        phase={phase}
      />
    ),
    '[공통] 시/도 선택': (
      <CommonSidoStep
        toDemandHubsStep={() => {
          setHistoryAndStep('[수요조사] 정류장 선택');
        }}
        toReservationHubsStep={() => setHistoryAndStep('[예약] 정류장 선택')}
        toExtraSidoInfoStep={() => setHistoryAndStep('[기타] 시/도 정보')}
        toExtraSelectProductStep={() => setHistoryAndStep('[기타] 상품 선택')}
      />
    ),
    // 수요조사
    '[수요조사] 정류장 선택': (
      <DemandHubsStep
        toNextStep={() => {
          setHistoryAndStep('[수요조사] 좌석 선택');
        }}
        setDemandCount={setDemandCount}
      />
    ),
    '[수요조사] 좌석 선택': (
      <DemandTripTypeStep
        toNextStep={() => {
          setHistoryAndStep('[수요조사] 정류장 정보');
        }}
      />
    ),
    '[수요조사] 정류장 정보': (
      <DemandHubInfoStep
        closeBottomSheet={closeBottomSheet}
        setDemandCompleteStatus={setDemandCompleteStatus}
        updateUserDemands={updateUserDemands}
        trackCompleteDemand={trackCompleteDemand}
      />
    ),
    // 예약
    '[예약] 정류장 선택': (
      <ReservationHubsStep
        toReservationTripTypeStep={() => setHistoryAndStep('[예약] 좌석 선택')}
        toExtraDuplicateHubStep={() => setHistoryAndStep('[기타] 복수 노선')}
        toExtraSeatAlarmStep={() => setHistoryAndStep('[기타] 빈자리 알림')}
        toDemandHubsStep={() => setHistoryAndStep('[수요조사] 정류장 선택')}
        closeBottomSheet={closeBottomSheet}
      />
    ),
    '[예약] 좌석 선택': (
      <ReservationTripTypeStep
        toReservationInfoStep={() => setHistoryAndStep('[예약] 예약 정보')}
        toExtraSeatAlarmStep={() => setHistoryAndStep('[기타] 빈자리 알림')}
      />
    ),
    '[예약] 예약 정보': (
      <ReservationInfoStep
        closeBottomSheet={closeBottomSheet}
        toExtraRealNameInputStep={() => setHistoryAndStep('[기타] 이름 입력')}
      />
    ),
    // 핸디팟
    '[핸디팟] 방향 선택': (
      <HandyPartyTripTypeStep
        toHandyPartySiGunGuStep={() => {
          setHistoryAndStep('[핸디팟] 시/군/구 선택');
        }}
      />
    ),
    '[핸디팟] 시/군/구 선택': (
      <HandyPartySiGunGuStep
        closeBottomSheet={closeBottomSheet}
        handleBack={handleBack}
      />
    ),
    // 기타
    '[기타] 시/도 정보': (
      <ExtraSidoInfoStep
        toExtraOpenSidoStep={() => setHistoryAndStep('[기타] 예약 가능 시/도')}
        toDemandHubsStep={() => setHistoryAndStep('[수요조사] 정류장 선택')}
      />
    ),
    '[기타] 예약 가능 시/도': (
      <ExtraOpenSidoStep
        toReservationHubsStep={() => setHistoryAndStep('[예약] 정류장 선택')}
        toExtraSelectProductStep={() => setHistoryAndStep('[기타] 상품 선택')}
      />
    ),
    '[기타] 복수 노선': (
      <ExtraDuplicateHubStep
        toReservationTripTypeStep={() => setHistoryAndStep('[예약] 좌석 선택')}
        toExtraSeatAlarmStep={() => setHistoryAndStep('[기타] 빈자리 알림')}
        closeBottomSheet={closeBottomSheet}
      />
    ),
    '[기타] 빈자리 알림': (
      <ExtraSeatAlarmStep
        closeBottomSheet={closeBottomSheet}
        updateUserAlertRequests={updateUserAlertRequests}
        openAlertRequestFeedbackScreen={openAlertRequestFeedbackScreen}
      />
    ),
    '[기타] 상품 선택': (
      <ExtraSelectProductStep
        toReservationHubsStep={() => setHistoryAndStep('[예약] 정류장 선택')}
        toHandyPartyTripTypeStep={() => setHistoryAndStep('[핸디팟] 방향 선택')}
      />
    ),
    '[기타] 이름 입력': (
      <ExtraRealNameInputStep closeBottomSheet={closeBottomSheet} />
    ),
  };

  return stepComponents[stepName];
};

export default StepComponent;
