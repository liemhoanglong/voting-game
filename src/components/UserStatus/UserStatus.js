import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import * as Role from 'constants/role.constant';
import { GameState } from 'recoils/gameState/atom';
import { teamService } from 'services';
import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as Styled from './UserStatus.styled';

const propTypes = {
  online: PropTypes.bool,
  username: PropTypes.string,
  role: PropTypes.number,
  userId: PropTypes.string,
};

const defaultProps = {
  online: false,
  username: '',
  role: -1,
  userId: '',
};

const roles = Role.ROLE_STRING;

function UserStatus(props) {
  const {
    online, username, role, userId,
  } = props;
  const { linkTeam } = useParams();
  const teamId = linkTeam.split('-')[1];

  const gameState = useRecoilValue(GameState);

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const classesExpand = Styled.ExpandIconRotate({ open });
  const classes = Styled.SelectRoleStyle();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleRemove = async (event) => {
    handleClose(event);
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    }).fire({
      title: '<strong>Delete</strong>',
      html:
        '<b>Do you want to remove </b>' +
        `<b style="color:red"> ${username} </b>` +
        '?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red',
      reverseButtons: true,
      focusConfirm: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await teamService.changeRole({ teamId, userId, role: -1 }); // role -1 to delete user
        } catch (err) {
          const error = getErrorMessage(err);
          Alert.error(error);
        }
        Swal.fire('Confirmed !', '', 'success');
      }
    });
  };

  const handleChangeRole = async (event, newRole) => {
    handleClose(event);
    if (role !== newRole) {
      try {
        await teamService.changeRole({ teamId, userId, role: newRole });
        Alert.success('Success change role of user');
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
  };

  const renderAdminRole = (anchorRef) => (
    <>
      <Button
        classes={{
          root: classes.root,
          label: classes.label,
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {roles[role]} <ExpandMoreIcon classes={{
          root: classesExpand.root,
        }}
        />

      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: '5000', position: 'absolute' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              {roles.slice(1, 3).map((eachRole, index) => (
                roles[role] !== eachRole &&
                <MenuItem key={eachRole} onClick={(e) => handleChangeRole(e, index + 1)}>{eachRole}</MenuItem>
              ))}
              <Styled.DivideRoleSelector />
              <MenuItem onClick={handleRemove}>
                <Styled.TextWarning>Remove</Styled.TextWarning>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
  return (
    <Styled.Wrapper>
      <Styled.UsernameTooltip title={username} placement="right">
        <Styled.UsernameWrapper>
          <Styled.UserStatus online={online} />
          <Styled.NameWrapper>{username}</Styled.NameWrapper>
        </Styled.UsernameWrapper>
      </Styled.UsernameTooltip>
      {
        (gameState.role === Role.ADMIN && role !== Role.ADMIN) ? renderAdminRole(anchorRef) : <Styled.RoleWrapper role={roles[role]}>{roles[role]} </Styled.RoleWrapper>
      }
    </Styled.Wrapper>

  );
}

UserStatus.propTypes = propTypes;
UserStatus.defaultProps = defaultProps;

export default UserStatus;
