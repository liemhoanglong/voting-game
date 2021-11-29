import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, useTheme } from '@material-ui/core/styles';

import { Scrollbars as Scrollbar } from 'react-custom-scrollbars';
import { useRecoilValue } from 'recoil';
import * as Role from 'constants/role.constant';
import * as CardState from 'constants/cardState.constant';
import { RouteUrl } from 'constants/router';

import { userService } from 'services';
import { Team } from 'recoils/team/atom';
import { GameState } from 'recoils/gameState/atom';
import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, AccordionDetails as MuiAccordionDetails, Backdrop,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import UserStatus from 'components/UserStatus';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import EditTeamModal from 'components/EditTeamModal';
import DarkLogo from 'assets/svgs/logo-blue.svg';
import TeamIcon from 'assets/svgs/team.svg';
import EditIcon from 'assets/svgs/editTeam.svg';
import * as Styled from './Sidebar.styled';

const Accordion = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '4px',
    paddingBottom: '4px',
  },
}))(MuiAccordionDetails);

function Sidebar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();
  const team = useRecoilValue(Team);
  const gameState = useRecoilValue(GameState);
  const [teamDropdown, setTeamDropdown] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onlineUsers = team.users?.filter((user) => (user.cardState !== CardState.OFFLINE)) || [];
  const offlineUsers = team.users?.filter((user) => (user.cardState === CardState.OFFLINE)) || [];
  const anchorRef = useRef(null);
  const classes = Styled.TeamSelectStyles();
  const crrUrl = window.location.href;
  const teamId = crrUrl.split('-')[crrUrl.split('-').length - 1];

  useEffect(() => {
    const getListTeam = async () => {
      try {
        const data = await userService.getTeamList();
        const teams = data.map((eachTeam) => ({
          adminId: eachTeam.adminId,
          teamId: eachTeam.teamId,
          name: eachTeam.name,
          teamLink: eachTeam.teamLink,
          urlImage: eachTeam.urlImage,
        }));
        setTeamList(teams);
      } catch (err) {
        Alert.error(getErrorMessage(err));
      }
    };
    getListTeam();
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [matches]);

  const handleClickLink = async (link) => {
    history.push(`/${link}`);
    setTeamDropdown(false);
  };

  const handleClickAway = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const handleCloseTeamDropdown = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setTeamDropdown(false);
  };

  const renderListUser = (title, listUser, online = true) => {
    if (listUser.length > 0) {
      return (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Styled.TitleUser>{title} ({listUser.length})</Styled.TitleUser>
          </AccordionSummary>
          <div>{
            listUser.map((user) => (
              <AccordionDetails key={user.userId}>
                <UserStatus username={user.name} userId={user.userId} online={online} role={user.role} />
              </AccordionDetails>
            ))
          }
          </div>
        </Accordion>);
    }
  };
  return (
    <Styled.SidebarWrapper>
      <Styled.Hamburger onClick={() => setShowMenu(true)}>
        <div />
        <div />
        <div />
      </Styled.Hamburger>
      {matches && <Backdrop open={showMenu} onClick={handleClickAway} />}

      <Styled.TeamWrapper $show={showMenu}>
        <Styled.Logo onClick={() => history.push(RouteUrl.HOME)} src={DarkLogo} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <ButtonMaterial
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            ref={anchorRef}
            onClick={() => setTeamDropdown(!teamDropdown)}
          >
            <Styled.TeamButtonWrapper>
              <Styled.TeamIcon src={team.urlImage?.url || TeamIcon} />
              <Styled.RenderName>
                <Styled.TeamTooltip placement="bottom-start" title={team.name}>
                  <Styled.NameTeam>{team.name}</Styled.NameTeam>
                </Styled.TeamTooltip>
              </Styled.RenderName>
              <Styled.DropdownIcon />
            </Styled.TeamButtonWrapper>
          </ButtonMaterial>
          <Popper
            open={teamDropdown}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            style={{ zIndex: '2100' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseTeamDropdown}>
                <Scrollbar
                  hideTracksWhenNotNeeded
                  autoHeight
                  autoHeightMin={0}
                  autoHeightMax={200}
                >
                  <Styled.AllTeamDropDownWrapper>
                    {teamList?.map((eachTeam) => (
                      <Styled.TeamTooltip placement="right" key={eachTeam.teamId} title={eachTeam.name}>
                        <Styled.LinkWrapper
                          key={eachTeam.teamId}
                          onClick={() => handleClickLink(eachTeam.teamLink)}
                          isSelect={teamId === eachTeam.teamId}
                        >
                          <Styled.TeamIcon src={eachTeam.urlImage?.url || TeamIcon} isListTeam isSelect={teamId === eachTeam.teamId} />
                          {eachTeam.name}
                        </Styled.LinkWrapper>
                      </Styled.TeamTooltip>))}
                  </Styled.AllTeamDropDownWrapper>
                </Scrollbar>
              </ClickAwayListener>
            </Paper>
          </Popper>
          {gameState.role === Role.ADMIN &&
            <Styled.EditTooltip
              title="Edit team"
              placement="right"
            >
              <Styled.EditIcon src={EditIcon} onClick={() => setOpenModal(true)} />
            </Styled.EditTooltip>}
        </div>
        <Styled.TeamUserList>
          <Scrollbar
            hideTracksWhenNotNeeded
            autoHeight
            autoHeightMin={0}
            autoHeightMax="calc(80vh - 10px)"
          >
            {renderListUser('Online Users', onlineUsers)}
            {renderListUser('Offline Users', offlineUsers, false)}
          </Scrollbar>
        </Styled.TeamUserList>
      </Styled.TeamWrapper>
      {
        openModal && <EditTeamModal
          teamId={teamId}
          name={team.name}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      }
    </Styled.SidebarWrapper>
  );
}

export default Sidebar;
