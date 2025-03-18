'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';
import { useEffect, useState } from 'react';
import { DEMAND_FORM_ID } from './DemandForm';
import { toast } from 'react-toastify';

interface Props {
  eventName: string;
  isNotOpen: boolean;
  isDailyEventSelected: boolean;
  isBigRegionSelected: boolean;
  isSmallRegionSelected: boolean;
}

const BottomBar = ({
  eventName,
  isNotOpen,
  isDailyEventSelected,
  isBigRegionSelected,
  isSmallRegionSelected,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  const [isInView, setIsInView] = useState(false);

  const handleClick = () => {
    const demandForm = document.getElementById(
      DEMAND_FORM_ID,
    ) as HTMLFormElement | null;
    if (!demandForm) {
      return;
    }
    if (!isInView) {
      demandForm.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isDailyEventSelected) {
      toast.error('일자와 지역을 선택해 주세요.');
    } else if (!isBigRegionSelected) {
      toast.error('지역을 선택해 주세요.');
    } else if (!isSmallRegionSelected) {
      toast.error('시/군/구를 선택해 주세요.');
    }
    if (isDailyEventSelected && isBigRegionSelected && isSmallRegionSelected) {
      demandForm.requestSubmit();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    const demandForm = document.getElementById(DEMAND_FORM_ID);
    if (demandForm) {
      observer.observe(demandForm);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto max-w-500 bg-basic-white shadow-bottomBar">
        <div className="flex flex-col gap-4 px-16 py-8">
          <p className="text-12 font-400 leading-[19.2px] text-brand-grey-500">
            수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
            결과를 노선 개설에 활용합니다.
          </p>
          <div className="flex justify-between gap-12 font-600">
            {isNotOpen ? (
              <>
                <Button disabled>수요조사가 마감된 행사이에요</Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={openBottomSheet}
                >
                  친구에게 알리기
                </Button>
                <Button type="button" onClick={handleClick}>
                  수요 신청하기
                </Button>
              </>
            )}
          </div>
        </div>
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
