import { DEV_MOCK_SHUTTLE_ROUTES } from './dev-mock-shuttle-routes.const';
import { PROD_MOCK_SHUTTLE_ROUTES } from './prod-mock-shuttle-routes.const';

export const MOCK_SHUTTLE_ROUTES =
  process.env.NODE_ENV === 'development'
    ? DEV_MOCK_SHUTTLE_ROUTES
    : PROD_MOCK_SHUTTLE_ROUTES;
