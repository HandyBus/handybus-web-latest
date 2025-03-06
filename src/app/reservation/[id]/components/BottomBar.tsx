'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';
import { usePostShuttleRouteDemand } from '@/services/shuttleRoute.service';
import { RESERVATION_DETAIL_FORM_ID } from './ReservationForm';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

interface Props {
  eventName: string;
  isNotOpen?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  isSeatFull?: boolean;
  selectedRoute?: ShuttleRoutesViewEntity;
}

const BottomBar = ({
  isNotOpen = false,
  isSelected = false,
  eventName,
  isLoading = false,
  isSeatFull = false,
  selectedRoute,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const getButtonText = () => {
    if (isNotOpen) {
      return '예약이 마감된 노선이에요';
    } else if (isSelected && !isSeatFull) {
      return '셔틀 예약하러 가기';
    } else if (isSelected && isSeatFull) {
      return '추가 셔틀 요청하기';
    } else if (!isSelected) {
      return '노선을 선택해주세요';
    } else {
      return '';
    }
  };
  const buttonText = getButtonText();

  const { mutate: postShuttleRouteDemand } = usePostShuttleRouteDemand();

  const handleClick = () => {
    if (!isSeatFull) {
      const form = document.getElementById(
        RESERVATION_DETAIL_FORM_ID,
      ) as HTMLFormElement;
      form?.requestSubmit();
      return;
    }
    if (!selectedRoute) {
      return;
    }
    postShuttleRouteDemand({
      eventId: selectedRoute.eventId,
      dailyEventId: selectedRoute.dailyEventId,
      shuttleRouteId: selectedRoute.shuttleRouteId,
      shuttleRouteHubId:
        selectedRoute.toDestinationShuttleRouteHubs?.[0].shuttleRouteHubId ??
        '',
    });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto h-60 max-w-500 bg-white shadow-bottomBar">
        {!isLoading && (
          <div className="flex justify-between gap-12 px-16 py-8 font-600">
            {isNotOpen ? (
              <>
                <Button disabled>{buttonText}</Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={openBottomSheet}
                >
                  친구에게 알리기
                </Button>
                <Button
                  type="button"
                  onClick={handleClick}
                  disabled={isNotOpen || !isSelected}
                  className={
                    isSeatFull
                      ? 'bg-[#E6FFF7] text-[#00C896] active:bg-[#d8fbf0]'
                      : ''
                  }
                >
                  {buttonText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <ShareSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
        eventName={eventName}
      />
    </>
  );
};

export default BottomBar;
