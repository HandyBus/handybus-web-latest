'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const revalidateUserPath = async () => {
  await Promise.all([
    revalidatePath('/mypage', 'layout'),
    revalidatePath('/onboarding', 'layout'),
  ]);
  redirect('/');
};

export default revalidateUserPath;
