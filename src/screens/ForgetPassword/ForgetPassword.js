import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import {
  ERROR_MAX_EMAIL_LENGTH,
  ERROR_EMAIL_IS_REQUIRED,
  ERROR_INVALID_EMAIL,
} from 'constants/message';
import {
  MAX_EMAIL_LENGTH,
} from 'constants/validator';
import { RoutableModalUrl } from 'constants/router';

import * as Alert from 'utils/alert.util';
import { authService } from 'services';
import { getErrorMessage } from 'utils/messageError.utils';

import ModalLayout from 'layouts/ModalLayout';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import ChangeModalLinkWrapper from 'components/ChangeModalLinkWrapper';
import * as Styled from './ForgetPassword.styled';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(ERROR_INVALID_EMAIL)
    .max(MAX_EMAIL_LENGTH, ERROR_MAX_EMAIL_LENGTH)
    .required(ERROR_EMAIL_IS_REQUIRED),
});

const propTypes = {
  closeModal: PropTypes.func,
};

const defaultProps = {
  closeModal: () => { },
};

function ForgetPasswordModal(props) {
  const history = useHistory();
  const [openSuccess, setOpenSuccess] = useState(false);
  const { bgLocation = {} } = history.location.state || {};

  const {
    closeModal,
  } = props;

  const handleReturnSignIn = (e) => {
    e.preventDefault();
    history.push('/log-in', { bgLocation });
  };

  const {
    handleSubmit, formState, control, getValues,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email }) => {
    try {
      await authService.sendResetPasswordEmail({ email });
      Alert.success('We have sent you an email to reset password!');
      setOpenSuccess(true);
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
    }
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      modalName="Forgot Password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Email to send recovery link"
              type="email"
              errorMessage={formState.errors.email?.message}
              variant="outlined"
              fullWidth
              autoFocus
              {...field}
            />
          )}
        />
        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Send
        </ButtonMaterial>
      </form>
      <ChangeModalLinkWrapper
        marginTop="15px"
        description="Already have an account?"
        pathName={RoutableModalUrl.LOGIN}
        bgLocation={{ bgLocation }}
        modalName="Log in"
      />
      <Modal open={openSuccess}>
        <ModalLayout
          closeModal={closeModal}
          modalName="Your reset password email has been sent!"
          horizontalModal
        >
          <Styled.SubMessage>
            Instruction for resetting your password have been sent to <strong>{getValues('email')}</strong>
            <br /><br />
            Be sure to check your spam folder, too.
          </Styled.SubMessage>
          <ButtonMaterial
            fullWidth
            onClick={(e) => handleReturnSignIn(e)}
          >
            Go to sign in
          </ButtonMaterial>
        </ModalLayout>
      </Modal>
    </ModalLayout>
  );
}

ForgetPasswordModal.propTypes = propTypes;
ForgetPasswordModal.defaultProps = defaultProps;

export default ForgetPasswordModal;
