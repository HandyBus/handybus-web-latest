import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DeadZone = ({ children }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw]">
      <div className="relative ml-auto flex min-h-[100dvh] max-w-500 flex-col shadow-xl shadow-basic-grey-200">
        {children}
      </div>
      {/* {pathname !== '/help/faq/privacy-policy' && <DeadZonePopup />} */}
    </div>
  );
};

export default DeadZone;
