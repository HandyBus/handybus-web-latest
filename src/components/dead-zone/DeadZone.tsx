import { ReactNode } from 'react';
import DeadZonePopup from './DeadZonePopup';

interface Props {
  children: ReactNode;
}

const DeadZone = ({ children }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw]">
      <div className="mx-auto flex min-h-[100dvh] max-w-500 flex-col shadow-xl shadow-grey-200">
        {children}
      </div>
      <DeadZonePopup />
    </div>
  );
};

export default DeadZone;
