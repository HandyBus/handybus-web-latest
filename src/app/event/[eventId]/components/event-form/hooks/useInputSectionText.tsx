import { useMemo } from 'react';

const useInputSectionText = (isReservationOpen: boolean) => {
  const text = useMemo(
    () => getInputSectionText(isReservationOpen),
    [isReservationOpen],
  );
  return text;
};

export default useInputSectionText;

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
