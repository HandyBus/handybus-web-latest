import { authInstance } from './config';

export class UnauthorizedError extends Error {
  constructor(message: string = '인증이 필요합니다') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export const getRegionHubs = async (regionId: string) => {
  try {
    const res = await authInstance.get(`/location/regions/${regionId}/hubs`);

    if (res.data.statusCode === 401) {
      throw new UnauthorizedError();
    }
    return res.data;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    console.error('Error fetching region hubs:', error);
    throw error;
  }
};
