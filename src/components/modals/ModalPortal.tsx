'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const MODAL_PORTAL_ID = 'modal';

interface Props {
  children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  const [mountedPortal, setMountedPortal] = useState<Element | null>(null);

  useEffect(() => {
    setMountedPortal(document.getElementById(MODAL_PORTAL_ID));
  }, []);

  if (!mountedPortal) return;
  return ReactDOM.createPortal(children, mountedPortal);
};

export default ModalPortal;
