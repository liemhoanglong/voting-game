import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

const AUTO_HIDE_DURATION = 5000;

const propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
  autoHideDuration: PropTypes.number,
  closeToast: PropTypes.func.isRequired,
};

const defaultProps = {
  open: false,
  type: 'info',
  message: '',
  autoHideDuration: AUTO_HIDE_DURATION,
};

function Toast(props) {
  const {
    open,
    type,
    message,
    autoHideDuration,
    closeToast,
  } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={autoHideDuration || AUTO_HIDE_DURATION}
      onClose={closeToast}
      action={(
        <>
          <IconButton onClick={closeToast}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    >
      <MuiAlert severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

export default Toast;
