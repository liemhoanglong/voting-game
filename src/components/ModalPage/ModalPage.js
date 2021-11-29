import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import * as Styled from './ModalPage.styled';

const propTypes = {
  children: PropTypes.node,
  modalName: PropTypes.string,
  horizontalModal: PropTypes.bool,
};

const defaultProps = {
  children: null,
  modalName: '',
  horizontalModal: false,
};

function ModalPage(props) {
  const {
    children, modalName, horizontalModal,
  } = props;

  return (
    <>
      <Header reverse />
      <Styled.Wrapper>
        <Styled.Container>
          <Styled.Content horizontalModal={horizontalModal}>
            <Styled.Title>{modalName}</Styled.Title>
            {children}
          </Styled.Content>
        </Styled.Container>
      </Styled.Wrapper>
    </>
  );
}

ModalPage.propTypes = propTypes;
ModalPage.defaultProps = defaultProps;

export default ModalPage;
