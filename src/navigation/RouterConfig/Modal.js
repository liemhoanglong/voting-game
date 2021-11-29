import { lazy } from 'react';
import { RoutableModalUrl } from 'constants/router';

export const ModalRouteConfig = [
  {
    component: lazy(() => import(/* webpackPrefetch: true */'screens/ForgetPassword')),
    path: RoutableModalUrl.FORGET_PASSWORD,
  },
  {
    component: lazy(() => import(/* webpackPrefetch: true */'screens/Signup')),
    path: RoutableModalUrl.SIGNUP,
  },
  {
    component: lazy(() => import(/* webpackPrefetch: true */'screens/Login')),
    path: RoutableModalUrl.LOGIN,
  },
];
