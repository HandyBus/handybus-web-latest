'use client';

import { useFlow } from '@/stacks';
import { useStack } from '@stackflow/react';

const usePopAll = () => {
  const flow = useFlow();
  const stack = useStack();

  const popAll = ({ animate = true }: { animate?: boolean } = {}) => {
    const activeActivity = stack.activities.filter(
      (activity) => activity.isActive,
    );
    flow.pop(activeActivity.length - 1, { animate });
  };

  return popAll;
};

export default usePopAll;
