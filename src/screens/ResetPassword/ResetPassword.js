import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  ERROR_MIN_PASSWORD_LENGTH,
  ERROR_PASSWORD_WHITESPACE,
  ERROR_PASSWORD_STRENGTH,
  ERROR_PASSWORD_IS_REQUIRED,
  ERROR_REPEAT_PASSWORD_IS_REQUIRED,
  ERROR_PASSWORD_MATCHED,
} from 'constants/message';
import {
  MIN_PASSWORD_LENGTH,
} from 'constants/validator';
import {
  PASSWORD_STRENGTH_REGEX,
  WHITE_SPACE_REGEX,
} from 'constants/regex';

import ModalPage from 'components/ModalPage';

import { authService } from 'services';
import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';

const validationSchema = Yup.object().shape({
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
});

function ResetPassword() {
  const history = useHistory();
  const { resetToken } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await authService.checkResetPasswordToken({ token: resetToken });
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
        history.push('/');
      }
    };
    checkToken();
  }, []);

  const {
    handleSubmit, formState, control,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onTouched',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ password }) => {
    try {
      const result = await authService.resetPassword({ token: resetToken, password });
      if (result) {
        Alert.success('Change password successfully!');
        history.push('/');
      }
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
    }
  };

  return (
    <ModalPage
      modalName="Reset Password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Your new password"
              type="password"
              errorMessage={formState.errors.password?.message}
              variant="outlined"
              fullWidth
              autoFocus
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
        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Reset Password
        </ButtonMaterial>
      </form>
    </ModalPage>
  );
}

export default ResetPassword;
