'use client';

import { ReactNode, forwardRef } from 'react';
import BottomSheetPortal from './BottomSheetPortal';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(
  ({ children, title, description }, ref) => {
    return (
      <BottomSheetPortal>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] hidden bg-basic-black/50">
          <div
            ref={ref}
            role="dialog"
            className="fixed -bottom-60 left-0 right-0 z-[101] mx-auto hidden max-h-[90dvh] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-basic-white px-32 pb-60 transition-transform duration-0 ease-out"
          >
            <div className="bg-basic-grey-100 mx-auto my-8 h-4 w-[70px] shrink-0 rounded-full" />
            {(title || description) && (
              <div className="py-12">
                {title && (
                  <h2 className="text-basic-grey-700 w-full text-22 font-700">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-basic-grey-400 text-14 font-400 leading-[22.4px]">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </BottomSheetPortal>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
