import { useEffect, useRef } from 'react';

const TRANSFORM_DURATION = '200ms';

const useBottomSheet = () => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openBottomSheet = () => {
    const bottomSheetElement = bottomSheetRef.current;
    const backdropElement = bottomSheetRef.current?.parentElement;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    bottomSheetElement.style.transitionDuration = '0ms';
    bottomSheetElement.style.display = 'block';
    backdropElement.style.display = 'block';

    const bottomSheetHeight = bottomSheetRef.current.clientHeight;
    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;

    setTimeout(() => {
      bottomSheetElement.style.transitionDuration = TRANSFORM_DURATION;
      bottomSheetElement.style.transform = `translateY(0px)`;
    }, 10);
  };

  const closeBottomSheet = () => {
    const bottomSheetElement = bottomSheetRef.current;
    const backdropElement = bottomSheetRef.current?.parentElement;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    const bottomSheetHeight = bottomSheetRef.current.clientHeight;
    bottomSheetElement.style.transitionDuration = TRANSFORM_DURATION;
    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;

    setTimeout(() => {
      bottomSheetElement.style.display = 'none';
      backdropElement.style.display = 'none';
    }, 150);
  };

  useEffect(() => {
    const backdropElement = bottomSheetRef.current?.parentElement;
    if (!backdropElement) {
      return;
    }
    backdropElement.addEventListener('click', closeBottomSheet);
    return () => {
      backdropElement.removeEventListener('click', closeBottomSheet);
    };
  }, []);

  return { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet };
};

export default useBottomSheet;
