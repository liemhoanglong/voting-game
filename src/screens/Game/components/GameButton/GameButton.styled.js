import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'constants/styles';

export const ShowCardButtonStyles = makeStyles({
  root: {
    border: `2px solid ${Colors.CLOUDY_BLUE}`,
    backgroundColor: Colors.CLOUDY_BLUE,
    color: Colors.BLACK,
    '&:hover': {
      opacity: '0.7',
      backgroundColor: Colors.CLOUDY_BLUE,
    },
  },
  label: {
    fontWeight: 600,
  },
});
