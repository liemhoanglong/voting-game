import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Colors } from 'constants/styles';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';

export const Wrapper = styled.div`

`;

export const AvatarStyles = makeStyles({
  avatar: {
    minWidth: '0 !important',
    padding: '5px 5px 5px 5px !important',
    borderRadius: '50%',
    '&:hover': {
      opacity: '1',
      backgroundColor: Colors.AVATAR_BLUR,
    },
  },
});

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const GroupsIcons = styled(GroupIcon)`
  font-size: 18px;
  color: ${Colors.BLACK};
`;

export const NewTeamIcon = styled(AddCircleOutlineIcon)`
  font-size: 18px;
  color: ${Colors.BLACK};
`;

export const MySubscription = styled(PaymentIcon)`
  font-size: 18px;
  color: ${Colors.BLACK};
`;

export const LogOutIcon = styled(ExitToAppIcon)`
  font-size: 18px;
  color: ${Colors.BLACK};
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: ${(props) => (props.$reverse ? Colors.BLACK : Colors.White)};
`;

export const UserEmail = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${Colors.GREY};
  line-height: 1.5;
`;

export const AvatarUser = styled.div`
  width: ${(props) => (props.$big ? '60px' : '35px')};
  height: ${(props) => (props.$big ? '60px' : '35px')};
  border-radius: 50%;
  background-color: ${(props) => (props.$reverse ? Colors.CLOUDY_BLUE : Colors.LIGHT_WHITE_BLUE)};
  color: ${(props) => (props.$reverse ? Colors.BLACK : Colors.DODGER_BLUE)};
  font-size: ${(props) => (props.$big ? '22px' : '18px')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  text-align: center;
  &:hover {
    cursor: pointer;
  }

   @media (max-width: 992px) {
    font-size: ${(props) => (props.$big ? '22px' : '15px')};
  }
`;

export const BaseImg = styled.img`
  width: ${(props) => (props.width ? props.$width : '25px')};
  height: ${(props) => (props.height ? props.$height : '25px')};
  margin: ${(props) => (props.margin ? props.$margin : '0px')};
  &:hover {
    cursor: pointer;
  }
`;

export const MaterialMenu = withStyles({
  paper: {
    boxShadow: `0 6px 18px -7px ${Colors.BLACK}`,
    borderRadius: '4px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export const MenuWrapper = styled.div`
  width: 260px;
`;

export const MenuPartWrapper = styled.div`
  border-bottom: ${(props) => (props.border ? `2px solid ${Colors.LIGHT_BLUE}` : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemWrapper = styled.div`
  padding: 8px 24px 8px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 40px;
  border-radius: 5px;
  width:100%;
  &:hover {
    background-color: ${Colors.WHITE_GREY};
    cursor: pointer;
  }
`;

export const ItemText = styled.span`
  line-height:1.5;
  font-weight: 500;
  white-space: no-wrap;
  overflow: hidden;
  margin-left:12px;
  font-size: 16px;
  color: ${(props) => (props.bold ? Colors.BLACK : Colors.GREY)};
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 10px 15px 10px;
  align-items: center;
  color: ${Colors.BLACK};
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${Colors.WHITE};

  &:visited {
    color: ${Colors.WHITE};
  }
`;
