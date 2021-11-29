import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const TeamWrapper = styled.div`
  width: 280px;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2000;
  position: relative;
  background-color: ${Colors.WHITE};
  transition: transform 0.3s ease-in-out;
  box-shadow: rgb(36 50 66 / 8%) 6px 0px 7px 0px;
  @media (max-width: 960px) {
    position: absolute;
    display: ${(props) => (props.$show ? 'block' : 'none')};
  }
`;

export const Logo = styled.img`
  padding: 20px 0 0 0px;
  width: 240px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export const SidebarWrapper = styled.div`
  z-index: 1001;
`;

export const Hamburger = styled.div`
  height: 34px;
  padding: 23px 0;
  width: 50px;
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${Colors.BLACK};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export const TeamSelectStyles = makeStyles({
  root: {
    height: '61px',
    borderRadius: '3px',
    backgroundColor: Colors.LIGHT_BLUE,
    margin: '0 10px',

    color: Colors.BLACK,
    border: `2px solid ${Colors.CLOUDY_BLUE}`,
    '&:hover': {
      opacity: 1,
      backgroundColor: Colors.LIGHT_BLUE,
      boxShadow: 'rgb(128 147 167 / 20%) 0px 3px 5px -1px, rgb(128 147 167 / 12%) 0px 1px 18px 0px,rgb(128 147 167 / 14%) 0px 6px 10px 0px',
    },
  },
  label: {
    fontWeight: 600,
  },
});

export const LinkWrapper = styled.div`
  display:flex;
  flex-direction: row;
  font-weight: 500;
  text-align: left;
  left: 15px;
  padding: 10px;
  color: ${Colors.BLACK};
  font-size: 16px;
  border-bottom: 1px solid ${Colors.LIGHT_BLUE};
  background-color:${(props) => (props.isSelect === true ? Colors.WHITE_GREY : Colors.WHITE)} ;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;


  &:hover {
    cursor: pointer;
    background-color: ${Colors.LIGHT_BLUE};
  }
`;

export const AllTeamDropDownWrapper = styled.div`
  background-color: ${Colors.WHITE};
  width: 225px;
  box-shadow: ${Boxshadows.GREY_SHADOW};
`;
export const TitleUser = styled.div`
  font-weight:700;
  font-family: 'Roboto Mono', monospace;
`;
export const TeamButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  span {
    width: 80%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size:14px;
    text-align:left;
    margin:0px;
    font-weight:500;
  }

`;

export const DropdownIcon = styled(ArrowDropDownIcon)`
  height: 16px;
  // margin-left: 40px;
  color: ${Colors.BLACK};
`;

export const TeamUserList = styled.div`
  margin-top: 24px;
`;

export const UserStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.online ? Colors.MAGIC_MINT : Colors.SEA_PINK)};
  margin-right: 8px;
  font-size: 14px;
`;

export const TeamTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
    maxWidth: '200px',
    marginTop: '0px',
  },
})(Tooltip);

export const EditTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);

export const TeamIcon = styled.img`
  width: ${(props) => (props.isListTeam ? '20px' : '30px')};
  height:${(props) => (props.isListTeam ? '20px' : '30px')};
  margin-right:${(props) => (props.isListTeam ? '10px' : '0px')};
`;
export const EditIcon = styled.img`
  width: 20px;
  height:20px;
  cursor: pointer;
  margin-right: 8px;
`;

export const RenderName = styled.div`
  display: flex;
  flex-direction: column;
  margin-left:10px;
`;

export const NameTeam = styled.div`
  font-weight: bold;
  font-size:16px;
  padding-top:5px;
  overflow:hidden;
  width:130px;
  text-align:left;
  text-overflow: ellipsis
`;
