import React, { lazy } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';

import { Modal } from '@material-ui/core';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import InputMaterial from 'components/Shared/InputMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './CardIssueModal.styled';

const ModalLayout = lazy(() => import('layouts/ModalLayout'));

const validationSchema = Yup.object().shape({
  issueName: Yup.string(),
  linkIssue: Yup.string(),
  descriptionIssue: Yup.string(),
});

const propTypes = {
  cardId: PropTypes.string,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  issue: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
};

const defaultProps = {
  cardId: '',
  openModal: false,
  closeModal: () => { },
  issue: '',
  link: '',
  description: '',
};

function CardIssueModal(props) {
  const {
    openModal,
    closeModal,
    cardId,
    issue,
    link,
    description,
  } = props;
  const { linkTeam } = useParams();
  const linkSplit = linkTeam.split('-');
  const teamId = linkSplit[linkSplit.length - 1];
  const gameState = useRecoilValue(GameState);
  const classes = Styled.ButtonSaveModalIssueStyles();
  const {
    handleSubmit, control,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      issueName: issue,
      linkIssue: link,
      descriptionIssue: description,
    },
    InputProps: { readOnly: false },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ issueName, linkIssue, descriptionIssue }) => {
    if (gameState.isHost) {
      try {
        const issueUpdate = {
          _id: cardId,
          teamId,
          issue: issueName,
          link: linkIssue,
          description: descriptionIssue,
        };
        await teamService.updateCardIssue(issueUpdate);
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <ModalLayout cardModal closeModal={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Name</h2>
          <Controller
            name="issueName"
            control={control}
            render={({ field }) => (
              <InputMaterial
                disabled={!gameState.isHost}
                label="Change name the issue"
                variant="outlined"
                fullWidth
                autoFocus
                {...field}
              />
            )}
          />
          <h2>Link</h2>
          <Controller
            name="linkIssue"
            control={control}
            render={({ field }) => (
              <InputMaterial
                disabled={!gameState.isHost}
                label="Add a link to the issue"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
          <h2>Description</h2>
          <Controller
            name="descriptionIssue"
            control={control}
            render={({ field }) => (
              <InputMaterial
                disabled={!gameState.isHost}
                label="Add description"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
          <Styled.ButtonContainer>
            {gameState.isHost && <ButtonMaterial classes={{ root: classes.root, label: classes.label }} fullWidth type="submit">Save</ButtonMaterial>}
          </Styled.ButtonContainer>
        </form>
      </ModalLayout>
    </Modal>
  );
}

CardIssueModal.propTypes = propTypes;
CardIssueModal.defaultProps = defaultProps;

export default CardIssueModal;
