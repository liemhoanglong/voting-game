import styled from 'styled-components';
import { Colors } from 'constants/styles';
import { TextField as MaterialTextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const TextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      fontSize: '16px',
      fontWeight: 500,
      color: `${Colors.BLACK} !important`,
      padding: '14px 16px',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 16px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiFormLabel-root, .MuiFormLabel-root.Mui-focused': {
      color: `${Colors.GREY}`,
      fontWeight: 500,
    },

    '& .MuiFormLabel-root.Mui-error , .MuiFormLabel-root.Mui-error.Mui-focused': {
      color: `${Colors.POMEGRANATE}`,
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: `${Colors.POMEGRANATE} !important`,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset, input:hover + fieldset, input:focus + fieldset': {
        borderColor: `${Colors.CLOUDY_BLUE}`,
        borderWidth: 2,
      },
    },
  },
})(MaterialTextField);

export const FieldError = styled.p`
  font-size: 12px;
  color: ${Colors.POMEGRANATE};
  margin: 6px 0;
  width: 344px;
  text-align: left;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
