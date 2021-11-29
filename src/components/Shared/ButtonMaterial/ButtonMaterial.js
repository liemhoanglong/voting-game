import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as Styled from './ButtonMaterial.styled';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  theme: PropTypes.string,
};

const defaultProps = {
  children: null,
  onClick: () => { },
  theme: 'primary',
};

const ButtonMaterial = forwardRef((props, ref) => {
  const {
    children,
    onClick,
    theme,
    ...otherProps
  } = props;
  const styleProps = { $theme: theme, ...otherProps };
  const classes = Styled.ButtonStyle(styleProps);

  return (
    <Button
      ref={ref}
      onClick={onClick}
      {...otherProps}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
    >
      {children}
    </Button>
  );
});

ButtonMaterial.propTypes = propTypes;
ButtonMaterial.defaultProps = defaultProps;

export default ButtonMaterial;
