import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { EMAIL_RESEND } from 'constants/time';

import { authService } from 'services';

import ModalLayout from 'layouts/ModalLayout';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './CountDownModal.styled';

const propTypes = {
  closeModal: PropTypes.func,
  email: PropTypes.string,
};

const defaultProps = {
  closeModal: () => { },
  email: '',
};

function CountDownModal(props) {
  const {
    closeModal, email: emailText,
  } = props;
  const [countDown, setCountDown] = useState(EMAIL_RESEND);

  const onSubmit = async (e, email) => {
    e.preventDefault();
    try {
      const result = await authService.resendVerificationEmail({ email });
      if (result) {
        Alert.success('Sent email!');
        setCountDown(EMAIL_RESEND);
      }
    } catch (err) {
      const error = getErrorMessage(err);
      Alert.error(error);
      setCountDown(EMAIL_RESEND);
    }
  };

  useEffect(() => {
    if (!countDown) return;

    const intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDown]);

  return (
    <ModalLayout
      closeModal={closeModal}
      modalName="We need to verify your email"
      horizontalModal
    >
      <Styled.SubMessage>
        We've sent an email to <strong>{emailText}</strong>. Verify your email to keep using
        Planning Poker. <br /><br />
        You may need to check your spam folder
      </Styled.SubMessage>
      <ButtonMaterial
        fullWidth
        disabled={countDown}
        onClick={(e) => onSubmit(e, emailText)}
      >
        Don't see it? Resend {countDown ? `(${countDown})` : <div />}
      </ButtonMaterial>
    </ModalLayout>
  );
}

CountDownModal.propTypes = propTypes;
CountDownModal.defaultProps = defaultProps;

export default CountDownModal;
