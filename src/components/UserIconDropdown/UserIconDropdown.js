import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import { RouteUrl } from 'constants/router';

import { User } from 'recoils/user/atom';
import { createNameAvatar } from 'utils/getFirstLetterName.util';

import TooltipMaterial from 'components/Shared/TooltipMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './UserIconDropdown.styled';

const propTypes = {
  reverse: PropTypes.bool,
};

const defaultProps = {
  reverse: false,
};

function UserIconDropdown(props) {
  const {
    reverse,
  } = props;
  const [user, setUser] = useRecoilState(User);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);

  const shortName = createNameAvatar(user.name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TooltipMaterial
        title="Profile"
        placement="bottom"
      >
        <ButtonMaterial className={Styled.AvatarStyles().avatar} ref={anchorRef} theme="transparent" onClick={handleClick}>
          <Styled.AvatarUser $reverse={reverse}>{shortName}</Styled.AvatarUser>
        </ButtonMaterial>
      </TooltipMaterial>
      <Styled.MaterialMenu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Styled.MenuWrapper>
          <Styled.MenuPartWrapper border>
            <Styled.AuthWrapper>
              <Styled.AvatarUser $reverse={reverse} $big>{shortName}</Styled.AvatarUser>
              <Styled.InfoWrapper>
                <Styled.UserName $reverse={reverse}>{user.name}</Styled.UserName>
                <Styled.UserEmail>{user.email}</Styled.UserEmail>
              </Styled.InfoWrapper>
            </Styled.AuthWrapper>
          </Styled.MenuPartWrapper>
          <Styled.MenuPartWrapper border>
            <Styled.Link to={RouteUrl.MY_TEAM}>
              <Styled.ItemWrapper>
                <Styled.GroupsIcons />
                <Styled.ItemText bold>My Team</Styled.ItemText>
              </Styled.ItemWrapper>
            </Styled.Link>
          </Styled.MenuPartWrapper>
          <Styled.MenuPartWrapper border>
            <Styled.Link to={RouteUrl.CREATE_TEAM}>
              <Styled.ItemWrapper>
                <Styled.NewTeamIcon />
                <Styled.ItemText bold>New Team</Styled.ItemText>
              </Styled.ItemWrapper>
            </Styled.Link>
          </Styled.MenuPartWrapper>
          <Styled.MenuPartWrapper>
            <Styled.ItemWrapper onClick={handleSignOut}>
              <Styled.LogOutIcon />
              <Styled.ItemText bold>Sign Out</Styled.ItemText>
            </Styled.ItemWrapper>
          </Styled.MenuPartWrapper>
        </Styled.MenuWrapper>
      </Styled.MaterialMenu>
    </>

  );
}

UserIconDropdown.propTypes = propTypes;
UserIconDropdown.defaultProps = defaultProps;

export default UserIconDropdown;
