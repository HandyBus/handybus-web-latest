import { ReactNode, forwardRef } from 'react';
import BottomSheetPortal from './BottomSheetPortal';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(
  ({ children, title, description }, ref) => {
    return (
      <BottomSheetPortal>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] hidden bg-black/50">
          <div
            ref={ref}
            role="dialog"
            className="fixed -bottom-60 left-0 right-0 mx-auto hidden max-h-[90dvh] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-white px-32 pb-60 transition-transform duration-0 ease-out"
          >
            <div className="mx-auto my-8 h-4 w-[70px] shrink-0 rounded-full bg-grey-100" />
            {(title || description) && (
              <div className="py-12">
                {title && (
                  <h2 className="w-full text-22 font-700 text-grey-900">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-14 font-400 leading-[22.4px] text-grey-400">
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
