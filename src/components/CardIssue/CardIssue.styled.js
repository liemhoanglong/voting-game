import styled from 'styled-components';
import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

export const VotingButtonStyle = makeStyles({
  root: {
    backgroundColor: (props) => (props.$selected ? Colors.GREY : Colors.GRAY_CHATEAU),
    color: (props) => (props.$selected ? Colors.WHITE : Colors.WHITE_GREY),
    padding: '7px 11px !important',
    '&:hover': {
      backgroundColor: (props) => (props.$selected ? Colors.DARK_GREY : Colors.GRAY_CHATEAU),
    },
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
  },
});

export const CardWrapper = styled.div`
  background-color: ${(props) => (props.$selected ? Colors.CLOUDY_BLUE : Colors.WHITE_GREY)};
  border-radius: 8px;
  padding: 24px;
  position: relative;
  width: 80%;
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: space-between;
  flex-direction: column;
  margin:10px 50px 20px 0px;
  :hover {
    box-shadow: ${Boxshadows.BLUE_SHADOW};
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.BLACK};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PointWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const PointHolder = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  width: 40px;
  height: 30px;
`;

export const MyMenuItem = styled(MenuItem)`
  padding: 0 !important;
`;

export const PointButtonStyles = makeStyles({
  root: {
    width: '40px',
    height: '40px',
    minWidth: '0 !important',
    borderRadius: '8px',
    backgroundColor: Colors.WHITE,
    boxShadow: Boxshadows.BLUE_SHADOW,
    padding: '6px 10px',
    '&:hover': {
      backgroundColor: Colors.WHITE,
    },
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
});

export const ButtonRemove = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 11px;
  font-size: 14px;
  color: ${Colors.WHITE};
  background-color: ${Colors.GRAY_CHATEAU};
  position: absolute;
  right: -7px;
  top: -7px;
  text-align: center;
  justify-content: center;
  display:none;
  opacity: 0.5;
  ${CardWrapper}:hover & {
    display: block;
  }
`;

export const TitleTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);
