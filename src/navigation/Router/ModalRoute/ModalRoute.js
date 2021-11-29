import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import {
  Redirect, Route, useHistory, useLocation,
} from 'react-router';
import { useRecoilValue } from 'recoil';

import { RouteUrl } from 'constants/router';
import { User } from 'recoils/user/atom';

import Loading from 'components/Loading';
import * as Styled from './ModalRoute.styled';

const modalDefaultProps = {
  minHeight: 250,
};

const propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  modalProps: PropTypes.shape({
    minHeight: PropTypes.number,
  }),
};

const defaultProps = {
  modalProps: modalDefaultProps,
  exact: false,
};

function ModalRoute({
  path,
  exact,
  modalProps,
  component: Component,
}) {
  const { minHeight, ...rest } = { ...modalProps, ...modalDefaultProps };

  const user = useRecoilValue(User);

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleCloseModal = () => {
    setOpenModal(false);
    const { bgLocation = {} } = history.location.state || {};
    const { pathname } = bgLocation;
    history.replace(pathname, null);
  };

  useEffect(() => {
    setOpenModal(true);
  }, [location]);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {user ? <Redirect replace to={RouteUrl.HOME} /> : (
        <Modal
          open={openModal}
          {...rest}
        >
          <Suspense fallback={(
            <Styled.LoadingContainer minHeight={minHeight}>
              <Loading />
            </Styled.LoadingContainer>
        )}
          >
            <Component closeModal={handleCloseModal} />
          </Suspense>
        </Modal>
      )}
    </Route>
  );
}

ModalRoute.propTypes = propTypes;
ModalRoute.defaultProps = defaultProps;

export default ModalRoute;
