'use client';

import { ReactNode, forwardRef } from 'react';
import BottomSheetPortal from './BottomSheetPortal';
import BackIcon from 'public/icons/back.svg';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  onBack?: () => void;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(
  ({ children, title, description, onBack }, ref) => {
    return (
      <BottomSheetPortal>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] hidden bg-basic-black/50">
          <div
            ref={ref}
            role="dialog"
            // 현재 바텀시트 하단의 여백은 60dvh (bottom, max-h, pb 속성으로 제어)
            className="fixed -bottom-[60dvh] left-0 right-0 z-[101] mx-auto hidden max-h-[calc(90dvh+60dvh)] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-basic-white px-24 pb-[60dvh] transition-transform duration-0 ease-out"
          >
            <div className="mx-auto my-8 h-4 w-[70px] shrink-0 rounded-full bg-basic-grey-200" />
            {(title || description) && (
              <div className="flex flex-col gap-4 break-keep pb-16 pt-12">
                {title && (
                  <h2 className="flex w-full items-center gap-4 text-20 font-700">
                    {onBack && (
                      <button type="button" onClick={onBack}>
                        <BackIcon />
                      </button>
                    )}
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-16 font-500 leading-[22.4px] text-basic-grey-600">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
            <div className="h-16" />
          </div>
        </div>
      </BottomSheetPortal>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
