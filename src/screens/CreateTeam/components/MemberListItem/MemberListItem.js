import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import * as Role from 'constants/role.constant';

import { createNameAvatar } from 'utils/getFirstLetterName.util';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import * as Styled from './MemberListItem.styled';

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  role: PropTypes.number,
  update: PropTypes.func,
  remove: PropTypes.func,
  memberIndex: PropTypes.number,
  owner: PropTypes.bool,
};

const defaultProps = {
  name: '',
  description: '',
  role: 1,
  memberIndex: null,
  update: () => { },
  remove: () => { },
  owner: false,
};

const roles = Role.ROLE_STRING;
function MemberListItem(props) {
  const {
    name,
    description,
    role,
    memberIndex,
    update,
    remove,
    owner,
  } = props;

  const title = name || 'Pending user';
  const shortName = createNameAvatar(name);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleRemove = (event) => {
    handleClose(event);
    remove(memberIndex);
  };

  const handleChangeRole = (event, role) => {
    handleClose(event);
    update(memberIndex, role);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <Styled.ItemContainer>
      <Styled.Avatar>{shortName}</Styled.Avatar>
      <Styled.TextContainer>
        <Styled.Title $hasName={Boolean(name)}>{title}</Styled.Title>
        {description && <Styled.Description>{description}</Styled.Description>}
      </Styled.TextContainer>

      <Button
        classes={{
          label: Styled.RoleSelectStyles().label,
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        disabled={owner}
      >
        {roles[role]}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: '2000' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              {roles.slice(1).map((role, index) => (
                <MenuItem key={role} onClick={(e) => handleChangeRole(e, index + 1)}>{role}</MenuItem>
              ))}
              <Styled.DivideRoleSelector />
              <MenuItem onClick={handleRemove}>
                <Styled.TextWarning>Remove</Styled.TextWarning>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>

      </Popper>
    </Styled.ItemContainer>
  );
}

MemberListItem.propTypes = propTypes;
MemberListItem.defaultProps = defaultProps;

export default MemberListItem;
