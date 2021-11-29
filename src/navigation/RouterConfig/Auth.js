import { lazy } from 'react';
import { RouteUrl } from 'constants/router';

export const AuthConfig = [
  {
    component: lazy(() => import('screens/CreateTeam')),
    path: RouteUrl.CREATE_TEAM,
  },
  {
    component: lazy(() => import('screens/MySubscription')),
    path: RouteUrl.MY_SUBSCRIPTION,
  },
  {
    component: lazy(() => import('screens/SubscriptionDetail')),
    path: RouteUrl.SUBSCRIPTION_DETAIL,
  },
  {
    component: lazy(() => import('screens/PageNotFound')),
    path: RouteUrl.PAGE_NOT_FOUND,
  },
  {
    component: lazy(() => import('screens/MyTeam')),
    path: RouteUrl.MY_TEAM,
  },
  {
    component: lazy(() => import('screens/Game')),
    path: RouteUrl.JIRA_CALLBACK,
  },
  {
    component: lazy(() => import('screens/Game')),
    path: RouteUrl.GAME,
  },
];
