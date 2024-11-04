'use client';

import { useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClosed: () => void;
  children: React.ReactNode;
  styles: string;
}

const CustomModal = ({ isOpen, onClosed, children, styles }: Props) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-[100%] w-[100%] items-center justify-center bg-black bg-opacity-50"
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) onClosed();
      }}
      role="dialog" // 접근성 : 스크린 리더가 모달을 인식할 수 있도록 하고 포커스를 이동
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles}>{children}</div>
    </div>
  );
};

export default CustomModal;
