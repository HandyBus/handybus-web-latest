'use server';

import { revalidatePath } from 'next/cache';

const PATHS_TO_REVALIDATE = ['/mypage', '/onboarding', '/login'];

export const revalidatePaths = () => {
  PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path, 'layout'));
};
