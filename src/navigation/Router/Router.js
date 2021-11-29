import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

import { useRoutableModal } from 'hooks';

import { ModalRouteConfig, GuestConfig, AuthConfig } from 'navigation/RouterConfig';
import Loading from 'components/Loading';
import GuestRoute from './GuestRoute';
import ModalRoute from './ModalRoute';
import AuthRoute from './AuthRoute';

const Home = loadable(() => import(/* webpackPreload: true */'screens/Home'));

const renderRoutes = (routes, RouteWrapper) => routes.map(({
  path, title, component, exact = true, ...props
}) => (
  <RouteWrapper
    key={path}
    title={title}
    path={path}
    exact={exact}
    component={component}
    {...props}
  />
));

function AppRouter() {
  const { location, bgLocation } = useRoutableModal();

  return (
    <>
      <Switch location={bgLocation || location}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/test" exact>
          <Loading fullScreen />
        </Route>
        {renderRoutes(AuthConfig, AuthRoute)}
        {renderRoutes(GuestConfig, GuestRoute)}
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
      {renderRoutes(ModalRouteConfig, ModalRoute)}
    </>
  );
}

export default AppRouter;
