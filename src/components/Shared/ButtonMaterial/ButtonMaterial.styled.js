/* eslint-disable no-nested-ternary */
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';

export const ButtonStyle = makeStyles({
  root: {
    paddingLeft: '15px',
    paddingRight: '15px',
    color: (props) => (props.$theme === 'secondary' ? Colors.DODGER_BLUE : Colors.WHITE),
    backgroundColor: (props) => (props.$theme === 'transparent' ? Colors.TRANSPARENT : (props.$theme === 'secondary' ? Colors.WHITE : Colors.DODGER_BLUE)),
    textTransform: 'none',

    '&:hover': {
      opacity: 0.7,
      backgroundColor: (props) => (props.$theme === 'transparent' ? Colors.BLUR_TRANSPARENT : (props.$theme === 'secondary' ? Colors.WHITE : Colors.DODGER_BLUE)),
    },

    '&:disabled': {
      cursor: 'default',
      opacity: 0.5,
      color: (props) => (props.$theme === 'secondary' ? Colors.DODGER_BLUE : Colors.WHITE),
    },
  },
  label: {
    fontSize: '18px',
    fontWeight: 500,
  },
}, { name: 'MuiButton' });
