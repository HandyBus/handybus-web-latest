'use client';

import InfoIcon from 'public/icons/info.svg';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  content: ReactNode;
}

const Tooltip = ({ content }: Props) => {
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(
    'top',
  );
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!tooltipRef.current || !containerRef.current) {
      return;
    }

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (container.top > tooltip.height) {
      setPosition('top');
    } else if (viewportHeight - container.bottom > tooltip.height) {
      setPosition('bottom');
    } else if (container.left > tooltip.width) {
      setPosition('left');
    } else {
      setPosition('right');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, []);

  const getTooltipClassName = () => {
    const baseClassName =
      'bg-basic-grey-50 rounded-6 text-basic-grey-500 absolute hidden max-w-212 p-8 text-12 font-500 group-hover:inline break-keep w-max';

    const positionClassName = {
      top: 'bottom-full left-1/2 -translate-x-1/2',
      bottom: 'top-full left-1/2 -translate-x-1/2',
      left: 'right-full top-1/2 -translate-y-1/2',
      right: 'left-full top-1/2 -translate-y-1/2',
    }[position];

    return `${baseClassName} ${positionClassName}`;
  };

  return (
    <div
      className="group relative inline-flex cursor-pointer"
      ref={containerRef}
    >
      <InfoIcon />
      <div ref={tooltipRef} className={getTooltipClassName()}>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
