import { useCallback } from 'react';

const usePreventScroll = () => {
  const preventScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const allowScroll = useCallback(() => {
    document.body.style.overflow = 'unset';
  }, []);

  return { preventScroll, allowScroll };
};

export default usePreventScroll;
