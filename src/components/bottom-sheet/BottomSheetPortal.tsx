'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const BOTTOM_SHEET_PORTAL_ID = 'bottom-sheet';

interface Props {
  children: ReactNode;
}

const BottomSheetPortal = ({ children }: Props) => {
  const [mountedPortal, setMountedPortal] = useState<Element | null>(null);

  useEffect(() => {
    setMountedPortal(document.getElementById(BOTTOM_SHEET_PORTAL_ID));
  }, []);

  if (!mountedPortal) return;
  return ReactDOM.createPortal(children, mountedPortal);
};

export default BottomSheetPortal;
