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
      className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-basic-black bg-opacity-50"
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) onClosed();
      }}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles}>{children}</div>
    </div>
  );
};

export default CustomModal;
