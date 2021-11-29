import React, { useState, lazy } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

import { RoutableModalUrl } from 'constants/router';
import {
  ERROR_MAX_EMAIL_LENGTH,
  ERROR_EMAIL_IS_REQUIRED,
  ERROR_INVALID_EMAIL,
  ERROR_MIN_PASSWORD_LENGTH,
  ERROR_PASSWORD_WHITESPACE,
  ERROR_PASSWORD_STRENGTH,
  ERROR_PASSWORD_IS_REQUIRED,
  ERROR_REPEAT_PASSWORD_IS_REQUIRED,
  ERROR_PASSWORD_MATCHED,
  ERROR_NAME_IS_REQUIRED,
  ERROR_MAX_NAME_LENGTH,
} from 'constants/message';
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'constants/validator';
import {
  PASSWORD_STRENGTH_REGEX,
  WHITE_SPACE_REGEX,
} from 'constants/regex';
import { Colors } from 'constants/styles';

import { authService } from 'services';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import ModalLayout from 'layouts/ModalLayout';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import ThirdPartyAuth from 'components/ThirdPartyAuth';
import ChangeModalLinkWrapper from 'components/ChangeModalLinkWrapper';
import * as Styled from './Signup.styled';

const CountDownModal = lazy(() => import('components/CountDownModal'));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(ERROR_INVALID_EMAIL)
    .max(MAX_EMAIL_LENGTH, ERROR_MAX_EMAIL_LENGTH)
    .required(ERROR_EMAIL_IS_REQUIRED),
  password: Yup.string()
    .trim()
    .required(ERROR_PASSWORD_IS_REQUIRED)
    .min(MIN_PASSWORD_LENGTH, ERROR_MIN_PASSWORD_LENGTH)
    .matches(WHITE_SPACE_REGEX, ERROR_PASSWORD_WHITESPACE)
    .matches(PASSWORD_STRENGTH_REGEX, ERROR_PASSWORD_STRENGTH),
  repeatPassword: Yup.string()
    .trim()
    .required(ERROR_REPEAT_PASSWORD_IS_REQUIRED)
    .oneOf([Yup.ref('password'), null], ERROR_PASSWORD_MATCHED),
  name: Yup.string()
    .trim()
    .required(ERROR_NAME_IS_REQUIRED)
    .max(MAX_NAME_LENGTH, ERROR_MAX_NAME_LENGTH),
});

const CustomColorCheckbox = withStyles({
  root: {
    '&$checked': {
      color: Colors.DODGER_BLUE,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const propTypes = {
  closeModal: PropTypes.func,
};

const defaultProps = {
  closeModal: () => { },
};

function SignUpModal(props) {
  const history = useHistory();
  const { bgLocation = {} } = history.location.state || {};
  const [openCountDown, setOpenCountDown] = useState(false);

  const {
    closeModal,
  } = props;

  const [checked, setChecked] = useState(false);

  const {
    handleSubmit, formState, control, getValues,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ name, email, password }) => {
    try {
      await authService.signup({ name, email, password });
      Alert.success('Sign up successfully. Please check your email to verify your account!');
      setOpenCountDown(true);
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
    }
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      modalName="Sign up"
    >
      <ChangeModalLinkWrapper
        marginBottom="30px"
        marginTop="-5px"
        description="Already have an account?"
        pathName={RoutableModalUrl.LOGIN}
        bgLocation={{ bgLocation }}
        modalName="Login"
      />
      <ThirdPartyAuth
        action="Sign up"
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
              autoFocus
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
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Repeat Password"
              type="password"
              errorMessage={formState.errors.repeatPassword?.message}
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Name"
              type="text"
              errorMessage={formState.errors.name?.message}
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Styled.CheckboxContainer>
          <Styled.CheckboxWrapper>
            <CustomColorCheckbox
              size="medium"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </Styled.CheckboxWrapper>
          <span> I agree to the <a href="#" target="_blank">Terms of service</a>. </span>
        </Styled.CheckboxContainer>
        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || !checked || formState.isSubmitting}
        >
          Sign Up
        </ButtonMaterial>
      </form>
      <Modal open={openCountDown}>
        <CountDownModal closeModal={closeModal} email={getValues('email')} />
      </Modal>
    </ModalLayout>
  );
}

SignUpModal.propTypes = propTypes;
SignUpModal.defaultProps = defaultProps;

export default SignUpModal;
