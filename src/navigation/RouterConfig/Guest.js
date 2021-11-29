import { lazy } from 'react';
import { RouteUrl } from 'constants/router';

export const GuestConfig = [
  {
    component: lazy(() => import('screens/Activate')),
    path: RouteUrl.ACTIVATE_EMAIL,
  },
  {
    component: lazy(() => import('screens/ResetPassword')),
    path: RouteUrl.RESET_PASSWORD,
  },
];
