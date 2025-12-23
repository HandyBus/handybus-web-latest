import { ReactNode } from 'react';
import AboutServicePopup from './AboutServicePopup';

interface Props {
  children: ReactNode;
}

const DeadZone = ({ children }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw] bg-[#f1f3f4]">
      <div className="relative ml-auto mr-[calc(max(0px,calc(100dvw-1280px)/2))] flex min-h-[100dvh] max-w-500 flex-col bg-basic-white shadow-xl shadow-basic-grey-200">
        {children}
      </div>
      <AboutServicePopup />
    </div>
  );
};

export default DeadZone;
