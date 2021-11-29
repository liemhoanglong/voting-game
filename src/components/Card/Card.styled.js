import { Colors } from 'constants/styles';
import { makeStyles } from '@material-ui/core/styles';

export const CardStyle = makeStyles({
  root: {
    minWidth: '0 !important',
    padding: 0,
    height: '80px',
    width: '48px',
    border: `2px solid ${Colors.GREY}`,
    outline: 0,
    cursor: 'pointer',
    transition: 'all .09s linear',
    borderRadius: '8px',
    fontSize: '19px !important',

    backgroundColor: (props) => (props.$selected ? Colors.GREY : Colors.WHITE),
    marginTop: (props) => (props.$selected ? '-15px' : '0'),
    color: (props) => (props.$selected ? Colors.WHITE : Colors.GREY),

    '&:hover': {
      marginTop: (props) => (props.$selected ? '-15px' : '-10px'),
      backgroundColor: (props) => (props.$selected ? Colors.GREY : Colors.LIGHT_BLUE),
    },
  },
});
