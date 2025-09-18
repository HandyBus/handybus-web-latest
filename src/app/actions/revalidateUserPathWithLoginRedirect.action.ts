'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const LOGIN_REDIRECT_URL_KEY = 'redirectUrl';

const revalidateUserPath = async (currentPath: string) => {
  await Promise.all([
    revalidatePath('/mypage', 'layout'),
    revalidatePath('/onboarding', 'layout'),
  ]);
  redirect(`/login?${LOGIN_REDIRECT_URL_KEY}=${currentPath}`);
};

export default revalidateUserPath;
