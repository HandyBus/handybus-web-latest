'use server';

import { revalidateTag } from 'next/cache';

const revalidateUser = () => {
  revalidateTag('user');
};

export default revalidateUser;
