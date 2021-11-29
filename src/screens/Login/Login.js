import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { RoutableModalUrl, RouteUrl } from 'constants/router';
import {
  ERROR_MAX_EMAIL_LENGTH,
  ERROR_EMAIL_IS_REQUIRED,
  ERROR_INVALID_EMAIL,
  ERROR_PASSWORD_IS_REQUIRED,
} from 'constants/message';
import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'constants/validator';

import { authService } from 'services';
import { User } from 'recoils/user/atom';

import ModalLayout from 'layouts/ModalLayout';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import ThirdPartyAuth from 'components/ThirdPartyAuth';
import ChangeModalLinkWrapper from 'components/ChangeModalLinkWrapper';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(ERROR_INVALID_EMAIL)
    .max(MAX_EMAIL_LENGTH, ERROR_MAX_EMAIL_LENGTH)
    .required(ERROR_EMAIL_IS_REQUIRED),
  password: Yup.string()
    .trim()
    .required(ERROR_PASSWORD_IS_REQUIRED)
    .min(MIN_PASSWORD_LENGTH, ''),
});

const propTypes = {
  closeModal: PropTypes.func,
};

const defaultProps = {
  closeModal: () => { },
};

function LoginModal(props) {
  const history = useHistory();
  const { bgLocation = {} } = history.location.state || {};

  const {
    closeModal,
  } = props;

  const setUser = useSetRecoilState(User);

  const {
    handleSubmit, formState, control,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await authService.login({ email, password });
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
    <ModalLayout
      closeModal={closeModal}
      modalName="Log in"
    >
      <ChangeModalLinkWrapper
        marginBottom="30px"
        marginTop="-5px"
        description="Don’t have an account yet?"
        pathName={RoutableModalUrl.SIGNUP}
        bgLocation={{ bgLocation }}
        modalName="Sign up"
      />
      <ThirdPartyAuth
        action="Login"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Email"
              type="email"
              errorMessage={formState.errors.email?.message}
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Password"
              type="password"
              errorMessage={formState.errors.password?.message}
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Login
        </ButtonMaterial>
      </form>
      <ChangeModalLinkWrapper
        marginTop="15px"
        description="Forgot password?"
        pathName={RoutableModalUrl.FORGET_PASSWORD}
        bgLocation={{ bgLocation }}
        modalName="Recover"
      />
    </ModalLayout>
  );
}

LoginModal.propTypes = propTypes;
LoginModal.defaultProps = defaultProps;

export default LoginModal;
