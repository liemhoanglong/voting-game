import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';

export const HeaderButtonStyles = makeStyles({
  root: {
    color: (props) => (props.$reverse && Colors.GREY),
    border: (props) => (props.$reverse ? `2px solid ${Colors.GREY}` : `2px solid ${Colors.TRANSPARENT}`),
    backgroundColor: (props) => (props.theme === 'transparent' && Colors.TRANSPARENT),
    minWidth: '0 !important',
    padding: (props) => (props.issue ? '6px ' : '10px px'),
    '&:hover': {
      opacity: '1',
      border: (props) => (props.$reverse && `2px solid ${Colors.CLOUDY_BLUE}`),
      color: (props) => (props.$reverse && Colors.BLACK),
      backgroundColor: (props) => (props.theme === 'transparent' && (props.$reverse ? Colors.CLOUDY_BLUE : Colors.BLUR_TRANSPARENT)),
    },
  },
  label: {
    fontWeight: 600,
    height: '24px',
  },
});

export const Divider = styled.div`
  width: 2px;
  height: 36px;
  background-color: ${Colors.CLOUDY_BLUE};
`;
