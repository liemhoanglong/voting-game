import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as Scrollbar } from 'react-custom-scrollbars';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as Styled from './ModalLayout.styled';

const propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  modalName: PropTypes.string,
  horizontalModal: PropTypes.bool,
  cardModal: PropTypes.bool,
};

const defaultProps = {
  closeModal: null,
  children: null,
  modalName: '',
  horizontalModal: false,
  cardModal: false,
};

const ModalLayout = forwardRef((props, ref) => {
  const {
    closeModal, children, modalName, horizontalModal, cardModal,
  } = props;

  const styles = {
    width: '100%',
    backgroundColor: '#fff',
  };

  const classes = Styled.CloseIconStyles();
  return (
    <Styled.Wrapper tabIndex={-1} ref={ref}>
      <Styled.Container>
        <Scrollbar
          style={styles}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="calc(100vh - 10px)"
          hideTracksWhenNotNeeded
        >
          <Styled.Content cardModal={cardModal} horizontalModal={horizontalModal}>
            {closeModal &&
              <IconButton
                classes={{
                  root: classes.root,
                }}
                aria-label="more"
                onClick={closeModal}
              >
                <CloseIcon />
              </IconButton>}
            <Styled.Title>{modalName}</Styled.Title>
            {children}
          </Styled.Content>
        </Scrollbar>
      </Styled.Container>
    </Styled.Wrapper>
  );
});

ModalLayout.propTypes = propTypes;
ModalLayout.defaultProps = defaultProps;

export default ModalLayout;
