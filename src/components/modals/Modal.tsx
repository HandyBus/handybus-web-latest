'use client';

import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';
import Button, { ButtonVariant } from '../buttons/button/Button';
import { customTwMerge } from 'tailwind.config';

interface Button {
  text: string;
  variant: ButtonVariant;
  onClick: () => void;
  disabled?: boolean;
}

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  title?: ReactNode;
  description?: ReactNode;
  primaryButton?: Button;
  secondaryButton?: Button;
}

const Modal = ({
  children,
  isOpen,
  title,
  description,
  closeModal,
  primaryButton,
  secondaryButton,
}: Props) => {
  return (
    <ModalPortal>
      <div
        onClick={closeModal}
        className={customTwMerge(
          'fixed bottom-0 left-0 right-0 top-0 z-[101] bg-basic-black/50',
          !isOpen && 'hidden',
        )}
      >
        <section
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-1/2 w-[327px] -translate-x-1/2 -translate-y-1/2 rounded-16 bg-basic-white pb-16"
        >
          {title && <h2 className="px-24 pt-24 text-16 font-600">{title}</h2>}
          {description && (
            <p className="px-24 pt-4 text-16 font-500 text-basic-grey-600">
              {description}
            </p>
          )}
          {children && <div className="px-24 pt-12">{children}</div>}
          {(secondaryButton || primaryButton) && (
            <div className="flex w-full gap-8 p-16 pb-0">
              {secondaryButton && (
                <Button
                  variant={secondaryButton.variant}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.text}
                </Button>
              )}
              {primaryButton && (
                <Button
                  variant={primaryButton.variant}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.text}
                </Button>
              )}
            </div>
          )}
        </section>
      </div>
    </ModalPortal>
  );
};

export default Modal;
