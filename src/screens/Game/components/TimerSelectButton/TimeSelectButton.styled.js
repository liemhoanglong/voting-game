import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const TimeSelect = makeStyles({
  root: {
    boxShadow: Boxshadows.GREY_CHATEAU_SHADOW,
    backgroundColor: (props) => (props.selected ? Colors.CLOUDY_BLUE : Colors.WHITE),
    marginLeft: (props) => (props.selected ? '-10px' : '0px'),
    '&:hover': {
      opacity: 1,
      backgroundColor: Colors.LIGHT_WHITE_BLUE,
      marginLeft: '-10px',
    },
  },
  label: {
    color: Colors.BLACK,
    fontSize: '18px',
  },
});
