'use client';

import type { ComponentProps, FC } from 'react';
import { useEffect, useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { getIsMobileWeb } from '@/utils/environment.util';

type StackAppScreenProps = ComponentProps<typeof AppScreen>;

const StackAppScreen: FC<StackAppScreenProps> = (props) => {
  const [isMobileWeb, setIsMobileWeb] = useState(getIsMobileWeb());

  useEffect(() => {
    setIsMobileWeb(getIsMobileWeb());
  }, []);

  return (
    <AppScreen
      {...props}
      preventSwipeBack={isMobileWeb || props.preventSwipeBack}
    />
  );
};

export default StackAppScreen;
