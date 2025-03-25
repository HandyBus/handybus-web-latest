'use client';

import HubButton from './HubButton';
import DateButton from './DateButton';
import BottomBar from './BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useEffect } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
// import CommonDateStep from './steps/common-steps/CommonDateStep';
// import CommonSidoStep from './steps/common-steps/CommonSidoStep';
// import ReservationHubsStep from './steps/reservation-steps/ReservationHubsStep';
// import ReservationTripTypeStep from './steps/reservation-steps/ReservationTripTypeStep';
// import ReservationInfoStep from './steps/reservation-steps/ReservationInfoStep';
import DemandHubInfoStep from './steps/demand-steps/DemandHubInfoStep';
// import ExtraSidoInfoStep from './steps/extra-steps/ExtraSidoInfoStep';
// import ExtraOpenSidoStep from './steps/extra-steps/ExtraOpenSidoStep';
// import DemandHubsStep from './steps/demand-steps/DemandHubsStep';
// import ExtraDuplicateHubStep from './steps/extra-steps/ExtraDuplicateHubStep';
// import ExtraSeatAlarmStep from './steps/extra-steps/ExtraSeatAlarmStep';
// import DemandTripTypeStep from './steps/demand-steps/DemandTripTypeStep';

const EventForm = () => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

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
        <BottomSheet ref={bottomSheetRef} title="노선 확인">
          <div ref={contentRef} className="overflow-y-auto">
            {/* <CommonDateStep /> */}
            {/* <CommonSidoStep /> */}
            {/* <ReservationHubsStep /> */}
            {/* <ReservationTripTypeStep /> */}
            {/* <ReservationInfoStep /> */}
            {/* <DemandHubsStep /> */}
            {/* <DemandTripTypeStep /> */}
            <DemandHubInfoStep />
            {/* <ExtraSidoInfoStep /> */}
            {/* <ExtraOpenSidoStep /> */}
            {/* <ExtraDuplicateHubStep /> */}
            {/* <ExtraSeatAlarmStep /> */}
          </div>
        </BottomSheet>
      </form>
    </section>
  );
};

export default EventForm;

// const EVENT_STEPS = [
//   // 공통
//   '[공통] 일자 선택',
//   '[공통] 시/도 선택',
//   // 수요조사
//   '[수요조사] 정류장 선택',
//   '[수요조사] 좌석 선택',
//   '[수요조사] 정류장 정보',
//   // 예약
//   '[예약] 정류장 선택',
//   '[예약] 좌석 선택',
//   '[예약] 예약 정보',
//   // 기타
//   '[기타] 시/도 정보',
//   '[기타] 예약 가능 시/도',
//   '[기타] 복수 노선',
//   '[기타] 빈자리 알림',
// ] as const;

// const EVENT_STEPS_TO_TEXT = {
//   // 공통
//   '[공통] 일자 선택': {
//     title: '언제 참가하시나요?',
//   },
//   '[공통] 시/도 선택': {
//     title: '어디서 이용하시나요?',
//   },
//   // 수요조사
//   '[수요조사] 시/군/구 선택': {
//     title: '세부 지역을 골라주세요',
//   },
//   '[수요조사] 정류장 선택': {
//     title: '원하는 정류장을 선택하세요',
//     description: '인기 정류장일수록 셔틀이 열릴 확률이 높아요.',
//   },
//   '[수요조사] 정류장 정보': {
//     title: '이 곳에 셔틀을 요청할까요?',
//     description: '이 정류장에서 셔틀이 열리면 바로 알려드릴게요.',
//   },
//   // 예약
//   '[예약] 정류장 선택': {
//     title: '원하는 정류장을 선택하세요',
//   },
//   '[예약] 좌석 선택': {
//     title: '언제 셔틀을 이용하시나요?',
//   },
//   '[예약] 예약 정보': {
//     title: '이 셔틀로 예약을 진행할게요',
//   },
//   // 기타
//   '[기타] 시/도 정보': {
//     title: '00은 수요조사 진행 중',
//     description: '셔틀이 필요한 인원과 정류장을 확인하고 있어요.',
//   },
//   '[기타] 예약 가능 시/도': {
//     title: '예약 가능 시/도',
//   },
//   '[기타] 복수 노선': {
//     title: '0개의 노선이 있어요',
//     description: '00 정류장을 지나는 셔틀 중 원하는 시간을 선택하세요.',
//   },
//   '[기타] 빈자리 알림': {
//     title: '알림이 신청되었어요!',
//     description: '빈자리를 예약할 수 있을 때 바로 알려드릴게요.',
//   },
// } as const;
