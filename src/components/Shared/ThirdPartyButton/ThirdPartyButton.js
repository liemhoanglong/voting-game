import React from 'react';
import PropTypes from 'prop-types';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './ThirdPartyButton.styled';

const propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  src: PropTypes.string,
};

const defaultProps = {
  onClick: () => {},
  disabled: false,
  children: null,
  src: '',
};

function ThirdPartyButton(props) {
  const classes = Styled.ThirdPartyButtonStyles();
  return (
    <ButtonMaterial
      theme="transparent"
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Styled.ThirdPartyButtonWrapper>
        <Styled.ThirdPartyIcon src={props.src} />
        {props.children}
      </Styled.ThirdPartyButtonWrapper>
    </ButtonMaterial>
  );
}

ThirdPartyButton.propTypes = propTypes;
ThirdPartyButton.defaultProps = defaultProps;

export default ThirdPartyButton;
