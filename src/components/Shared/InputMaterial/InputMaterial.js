import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './InputMaterial.styled';

const propTypes = {
  errorMessage: PropTypes.string,
};

const defaultProps = {
  errorMessage: '',
};

const InputMaterial = forwardRef((props, ref) => {
  const {
    errorMessage,
    ...otherProps
  } = props;

  return (
    <Styled.InputWrapper>
      <Styled.TextField
        inputRef={ref}
        error={Boolean(errorMessage)}
        {...otherProps}
      />
      {errorMessage && (<Styled.FieldError>{errorMessage}</Styled.FieldError>)}
    </Styled.InputWrapper>
  );
});

InputMaterial.propTypes = propTypes;
InputMaterial.defaultProps = defaultProps;

export default InputMaterial;
