'use server';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logout = async () => {
  cookies().delete(ACCESS_TOKEN);
  cookies().delete(REFRESH_TOKEN);
  revalidatePath('/mypage', 'layout');
  revalidatePath('/onboarding', 'layout');
  redirect('/');
};

export default logout;
