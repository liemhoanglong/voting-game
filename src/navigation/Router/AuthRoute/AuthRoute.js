import React, { Suspense, useEffect } from 'react';
import {
  useHistory,
  Route,
  Redirect,
} from 'react-router';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { RouteUrl, RoutableModalUrl } from 'constants/router';
import { User } from 'recoils/user/atom';

import Loading from 'components/Loading';
import * as Styled from './AuthRoute.styled';

const propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const defaultProps = {
  exact: false,
};

function AuthRoute({
  path,
  exact,
  component: Component,
}) {
  const user = useRecoilValue(User);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push(RoutableModalUrl.LOGIN, { bgLocation: history.location });
    }
  });

  if (!user) {
    return <Redirect to={RouteUrl.HOME} />;
  }
  return (
    <Route
      path={path}
      exact={exact}
    >
      <Suspense fallback={(
        <Styled.LoadingContainer>
          <Loading />
        </Styled.LoadingContainer>
        )}
      >
        <Component />
      </Suspense>
    </Route>
  );
}

AuthRoute.propTypes = propTypes;
AuthRoute.defaultProps = defaultProps;

export default AuthRoute;
