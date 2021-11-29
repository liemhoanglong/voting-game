import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  ERROR_SERVER_ERROR,
  ACTIVATE_SUCCESS,
} from 'constants/message';

import { authService } from 'services';

import ModalPage from 'components/ModalPage';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './Activate.styled';

function Activate() {
  const [message, setMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const history = useHistory();
  const { token } = useParams();

  const { handleSubmit } = useForm();
  useEffect(() => {
    const getResult = async () => {
      try {
        await authService.activate(token);
        setMessage(ACTIVATE_SUCCESS);
        setSubMessage('Successfully activated your account, you can continue to home page.');
      } catch (err) {
        setMessage('Error activating your account!');
        setSubMessage(ERROR_SERVER_ERROR);
      }
    };
    getResult();
  }, []);

  const onSubmit = async () => { history.push('/'); };

  return (
    <ModalPage
      modalName={message}
      notPopUp
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.SubText>{subMessage}</Styled.SubText>
        <ButtonMaterial
          type="submit"
          fullWidth
        >
          Return to homepage
        </ButtonMaterial>
      </form>
    </ModalPage>
  );
}

export default Activate;
