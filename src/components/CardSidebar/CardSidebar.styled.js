import styled from 'styled-components';
import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';
import { makeStyles } from '@material-ui/core/styles';

export const CardIssueWrapper = styled.div`
  width: 270px;
  max-height: 510px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 5px;
`;

export const SidebarHeader = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
`;

export const Title = styled.div`
  display:flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.BLACK};
  margin:10px 10px 0px 0px;
`;

export const CardVoting = styled.div`
    position: 'fixed';
    width: '100%';
    top: '83%';
`;

export const Divider = styled.div`
  margin-top:16px;
  width: 2px;
  height: 30px;
  background-color: ${Colors.CLOUDY_BLUE};
`;

export const DividerVoting = styled.div`
  height:3px;
  width: 275px;
  background-color: ${Colors.CLOUDY_BLUE};
`;

export const SideBarWrapper = styled.div`
  padding: 1% 1% 0 1%;
  background-color: ${Colors.WHITE};
  display: flex;
  position: relative;
  flex-direction: column;
  height: calc(100vh - 20px);
  display: ${(props) => (props.$show ? 'block' : 'none')};
`;

export const ScrollbarWrapper = styled.div`
  padding-top: 10px;
  position: sticky;
  top: 0px;
  max-width:275px !important;
  right: 0px;
  background-color: ${Colors.WHITE};
`;

export const OpenCardPopper = styled.div`
  position: absolute;
  top: 20px;
  left: 290px;
  z-index: 1000;
  border-radius: 8px;
  background-color: ${Colors.WHITE};
  display: ${(props) => (props.$open ? '-webkit-box' : 'none')};
  width: 300px;
  box-shadow: ${Boxshadows.GREY_SHADOW};
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding: 0 5px;
  border: 2px solid ${Colors.GREY};

  @media (max-width: 960px) {
    top: 15px;
    left: 70px;
  }
  height: 3.6em;
  line-height: 1.8em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    cursor: pointer;
    background-color: ${Colors.WHITE_GREY};
  }
`;

export const IssueCurrentName = styled.div`
  margin-top: 10px;
  border: 2px solid ${Colors.GREY};
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  height: 84px;
  padding: 4px;
  max-width: 262px;
  text-align: left;
  line-height: 17px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) => (props.$open ? '-webkit-box' : 'none')};
`;

export const SidebarButtonStyles = makeStyles({
  root: {
    color: `${Colors.BLACK}`,
    minWidth: '0 !important',
    padding: '10px 10px 10px 10px !important',
    margin: (props) => (props.cancel ? '10px 0px 0px 70px !important' : '10px 0px 0px 5px !important'),
    borderRadius: '50%',
    backgroundColor: (props) => (props.theme === 'transparent' && Colors.TRANSPARENT),
    '&:hover': {
      opacity: '1',
      backgroundColor: (props) => (props.theme === 'transparent' && Colors.CLOUDY_BLUE),
    },
  },
  label: {
    fontWeight: 600,
  },
});

export const ConfirmIssueStyle = makeStyles({
  root: {
    color: (props) => (props.color),
    backgroundColor: (props) => (props.value ? Colors.DODGER_BLUE : Colors.GRAY_CHATEAU),
    width: '45%',
    '&:hover': {
      opacity: '0.7',
      backgroundColor: (props) => (props.value ? Colors.DODGER_BLUE : Colors.GRAY_CHATEAU),
    },
  },
  label: {
    fontWeight: 600,
    fontSize: '16px',
  },
});

export const AddNewIssueStyle = makeStyles({
  root: {
    color: Colors.GRAY_CHATEAU,
    backgroundColor: Colors.TRANSPARENT,
    width: '100%',
    marginTop: '10px',
    '&:hover': {
      opacity: '0.7',
      backgroundColor: Colors.GRAY_CHATEAU,
      color: Colors.WHITE,
    },
  },
  label: {
    fontWeight: 600,
    fontSize: '16px',
  },
});
