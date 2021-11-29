import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { RouteUrl } from 'constants/router';
import Environment from 'constants/environment';

import { User } from 'recoils/user/atom';
import { authService } from 'services';

import facebook from 'assets/svgs/facebook.svg';
import google from 'assets/svgs/google.svg';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import ThirdPartyButton from '../Shared/ThirdPartyButton';
import * as Styled from './ThirdPartyAuth.styled';

const propTypes = {
  action: PropTypes.string,
};

const defaultProps = {
  action: '',
};

function ThirdPartyAuth(props) {
  const history = useHistory();
  const setUser = useSetRecoilState(User);

  const responseGoogle = async ({ tokenId }) => {
    if (!tokenId) return;
    try {
      const result = await authService.loginWithGoogle(tokenId);
      if (result) {
        setUser({
          token: result.token,
          name: result.name,
          email: result.email,
        });
        Alert.success('Login successful');
        history.push(RouteUrl.HOME);
      }
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
    }
  };

  const responseFacebook = async ({ userID, accessToken }) => {
    try {
      const result = await authService.loginWithFacebook({ userId: userID, facebookToken: accessToken });
      if (result) {
        setUser({
          token: result.token,
          name: result.name,
          email: result.email,
        });
        Alert.success('Login successful');
        history.push(RouteUrl.HOME);
      }
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
    }
  };

  return (
    <>
      <GoogleLogin
        clientId={`${Environment.GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <ThirdPartyButton
            onClick={renderProps.onClick}
            disabled={false}
            src={google}
          >
            {props.action} with Google
          </ThirdPartyButton>
        )}
      />
      <FacebookLogin
        appId={`${Environment.FACEBOOK_CLIENT_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <ThirdPartyButton
            onClick={renderProps.onClick}
            disabled
            src={facebook}
          >
            {props.action} with Facebook
          </ThirdPartyButton>
        )}
      />
      <Styled.DivideContainer>
        <hr />
        <span>Or</span>
        <hr />
      </Styled.DivideContainer>
    </>
  );
}

ThirdPartyAuth.propTypes = propTypes;
ThirdPartyAuth.defaultProps = defaultProps;

export default ThirdPartyAuth;
