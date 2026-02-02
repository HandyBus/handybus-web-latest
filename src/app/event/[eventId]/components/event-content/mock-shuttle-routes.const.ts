import { DEV_MOCK_SHUTTLE_ROUTES } from './dev-mock-shuttle-routes.const';
import { PROD_MOCK_SHUTTLE_ROUTES } from './prod-mock-shuttle-routes.const';

export const MOCK_SHUTTLE_ROUTES =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? PROD_MOCK_SHUTTLE_ROUTES
    : DEV_MOCK_SHUTTLE_ROUTES;
