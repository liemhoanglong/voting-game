import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RoutableModalUrl, RouteUrl } from 'constants/router';

import { User } from 'recoils/user/atom';

import Logo from 'assets/svgs/logo.svg';
import DarkLogo from 'assets/svgs/logo-blue.svg';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import HeaderButton from 'components/HeaderButton';
import * as Styled from './Header.styled';

const propTypes = {
  reverse: PropTypes.bool,
  inGame: PropTypes.bool,
};

const defaultProps = {
  reverse: false,
  inGame: false,
};

function Header(props) {
  const {
    reverse,
    inGame,
  } = props;

  const location = useLocation();
  const history = useHistory();
  const user = useRecoilValue(User);
  return (
    <Styled.HeaderContainer $light={reverse} transparent={inGame}>
      <Styled.Logo onClick={() => history.push(RouteUrl.HOME)} $visibility={inGame} src={reverse ? DarkLogo : Logo} />
      <Styled.ButtonContainer>
        {user ? (<HeaderButton inGame={inGame} />
        ) : (!reverse && (
          <>
            <ButtonMaterial theme="transparent">
              <Styled.Link
                to={{
                  pathname: RoutableModalUrl.SIGNUP,
                  state: { bgLocation: location },
                }}
              >
                Sign up
              </Styled.Link>
            </ButtonMaterial>
            <ButtonMaterial theme="transparent">
              <Styled.Link
                to={{
                  pathname: RoutableModalUrl.LOGIN,
                  state: { bgLocation: location },
                }}
              >
                Log in
              </Styled.Link>
            </ButtonMaterial>
          </>
        ))}
      </Styled.ButtonContainer>
    </Styled.HeaderContainer>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
