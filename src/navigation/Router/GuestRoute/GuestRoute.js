import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Redirect, Route,
} from 'react-router';
import { useRecoilValue } from 'recoil';

import { RouteUrl } from 'constants/router';
import { User } from 'recoils/user/atom';

import Loading from 'components/Loading';
import * as Styled from './GuestRoute.styled';

const propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const defaultProps = {
  exact: false,
};

function GuestRoute({
  path,
  exact,
  component: Component,
}) {
  const user = useRecoilValue(User);

  useEffect(() => {
  }, [user]);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {user ? <Redirect replace to={RouteUrl.HOME} /> : (
        <Suspense fallback={(
          <Styled.LoadingContainer>
            <Loading />
          </Styled.LoadingContainer>
        )}
        >
          <Component />
        </Suspense>) }
    </Route>
  );
}

GuestRoute.propTypes = propTypes;
GuestRoute.defaultProps = defaultProps;

export default GuestRoute;
