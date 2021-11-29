import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import TimerIcon from '@material-ui/icons/Timer';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const TableWrapper = styled.div`
  position: absolute;
  top: -27px;
  left: 30px;
`;

export const Permission = styled.div`
  color: ${Colors.GREY};
  h2 {
    margin: 20px 0 5px 0;
  }
`;

export const TimerCircle = withStyles({
  root: {
    color: Colors.GREY,
  },
})(CircularProgress);

export const MyTimerIcon = withStyles({
  root: {
    height: '40px',
    width: '40px',
    color: Colors.GREY,
  },
})(TimerIcon);

export const TimerTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);

export const TimerConfig = styled.div`
  width: 240px;
  padding: 24px;
  margin: 5px 0 0 10px;
  background-color: ${Colors.WHITE};
  box-sizing: border-box;
  box-shadow: ${Boxshadows.GREY_CHATEAU_SHADOW};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:10px;
  align-items: center;
`;

export const TimerButtonStyles = makeStyles({
  root: {
    minWidth: '0 !important',
    padding: '5px 5px 5px 5px !important',
    borderRadius: '50%',
    backgroundColor: Colors.LIGHT_WHITE_BLUE,
    '&:hover': {
      opacity: '1',
      backgroundColor: Colors.AVATAR_BLUR,
    },
  },
});
