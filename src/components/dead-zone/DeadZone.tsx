import { ReactNode } from 'react';
import DeadZonePopup from './DeadZonePopup';

interface Props {
  children: ReactNode;
}

const DeadZone = ({ children }: Props) => {
  return (
    <div className="relative h-[100dvh] w-[100dvw]">
      <div className="mx-auto h-[100dvh] max-w-500 overflow-y-auto shadow-xl shadow-grey-200">
        {children}
      </div>
      <DeadZonePopup />
    </div>
  );
};

export default DeadZone;
