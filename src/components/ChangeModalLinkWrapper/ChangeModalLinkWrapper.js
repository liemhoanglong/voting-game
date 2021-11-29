import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './ChangeModalLinkWrapper.styled';

const propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  description: PropTypes.string,
  pathName: PropTypes.string,
  bgLocation: PropTypes.object,
  modalName: PropTypes.string,
};

const defaultProps = {
  marginTop: null,
  marginBottom: null,
  description: '',
  pathName: '',
  bgLocation: null,
  modalName: '',
};

function ChangeModalLinkWrapper(props) {
  return (
    <Styled.LinkWrapper
      mt={props.marginTop}
      mb={props.marginBottom}
    >
      {props.description}
      <Styled.Link
        to={{
          pathname: props.pathName,
          state: props.bgLocation,
        }}
      >
        {props.modalName}
      </Styled.Link>
    </Styled.LinkWrapper>
  );
}

ChangeModalLinkWrapper.propTypes = propTypes;
ChangeModalLinkWrapper.defaultProps = defaultProps;

export default ChangeModalLinkWrapper;
