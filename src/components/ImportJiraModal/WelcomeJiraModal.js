import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
} from '@material-ui/core';

import Environment from 'constants/environment';
import { Colors } from 'constants/styles/Colors';

import CloseIcon from '@material-ui/icons/Close';

import robotCable from 'assets/svgs/robot-cable.svg';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const defaultProps = {
  open: false,
  handleClose: () => {},
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function WelcomeToJiraImportModal(props) {
  const { open, handleClose } = props;
  const { pathname } = useLocation();

  const handleAccessJira = () => {
    // open a new tab
    window.open(
      [
        'https://auth.atlassian.com/authorize?',
        'audience=api.atlassian.com&',
        `client_id=${Environment.JIRA_API_ID}&`,
        'scope=read:jira-user read:jira-work write:jira-work&',
        `redirect_uri=${Environment.REDIRECT_URI}&`,
        `state=${pathname.slice(1)}&`,
        'response_type=code&',
        'prompt=consent',
      ].join(''),
      '_blank',
    );
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="Welcome-to-jira-import"
      maxWidth="xs"
      fullWidth
      scroll="paper"
      PaperProps={{
        style: { borderRadius: '1.6rem' },
      }}
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
        Import from JIRA
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <center>
          <img src={robotCable} alt="robot-cable" />
          <Styled.IssueText
            style={{ fontWeight: 500, fontSize: 28, marginTop: '2rem' }}
          >
            Welcome to JIRA import !
          </Styled.IssueText>
          <Styled.IssueText
            style={{ color: Colors.GRAY_CHATEAU, marginTop: '1rem' }}
          >
            You need to allow us access to your Atlassian account.
          </Styled.IssueText>
        </center>
        <ButtonMaterial
          onClick={handleAccessJira}
          fullWidth
          style={{ marginTop: '2rem', borderRadius: 10 }}
        >
          Let's go !
        </ButtonMaterial>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

WelcomeToJiraImportModal.propTypes = propTypes;
WelcomeToJiraImportModal.defaultProps = defaultProps;

export default WelcomeToJiraImportModal;
