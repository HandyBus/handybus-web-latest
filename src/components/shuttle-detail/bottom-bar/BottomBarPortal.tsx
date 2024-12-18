'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const BottomBarPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    children,
    document.getElementById('bottom-bar-root') || document.body,
  );
};

export default BottomBarPortal;
