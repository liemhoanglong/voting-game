/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

import * as VotingSystem from 'constants/votingSystem.constant';

import { GameState } from 'recoils/gameState/atom';
import { teamService } from 'services';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import CardIssueModal from 'components/CardIssueModal';
import * as Styled from './CardIssue.styled';

const propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number,
};

const defaultProps = {
  selected: false,
  index: 0,
};

function CardIssue(props) {
  const {
    selected,
    index,
  } = props;
  const gameState = useRecoilValue(GameState);

  const {
    voteScore,
    issue,
    link,
    description,
    cardId,
  } = gameState.cardIssue[index];
  const { linkTeam } = useParams();
  const linkSplit = linkTeam.split('-');
  const teamId = linkSplit[linkSplit.length - 1];
  const [pointPopper, setPointPopper] = useState(false);
  const anchorRef = useRef(null);

  const classes = Styled.PointButtonStyles();

  const handleToggle = () => {
    setPointPopper((prevOpen) => !prevOpen);
    if (gameState.countDownShowCards || gameState.isCountingDown) {
      setPointPopper(false);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setPointPopper(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setPointPopper(false);
    }
  };

  const handleOnClick = async () => {
    if (gameState.isHost && !gameState.countDownShowCards && !gameState.isCountingDown && !gameState.gameFinish) {
      try {
        const isSelect = !selected;
        await teamService.selectCardIssue({
          teamId,
          cardId,
          isSelect,
        });
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
  };

  const removeCardIssueById = async () => {
    if (!selected && gameState.isHost) {
      if (!gameState.isCountingDown && !gameState.countDownShowCards) {
        Swal.fire({
          title: '<strong>Delete</strong>',
          html:
            '<b>Do you want to remove the issue </b>' +
            `<b style="color:red"> ${issue} </b>` +
            '?',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: 'red',
          reverseButtons: true,
          focusConfirm: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await teamService.removeCardIssueById({ teamId, cardId });
            } catch (err) {
              const error = getErrorMessage(err);
              Alert.error(error);
            }
          }
        });
      }
    } else {
      Swal.fire({
        text: "You can't delete card while voting",
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!',
      });
    }
  };

  const handleChangeVoteScore = async (e, point) => {
    e.preventDefault();
    handleClose(e);
    if (gameState.isHost) {
      try {
        const issueUpdate = {
          _id: cardId,
          teamId,
          voteScore: point,
        };
        await teamService.updateCardIssue(issueUpdate);
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
  };

  const [openModal, setOpenModal] = useState(false);
  return (
    <div style={{ paddingRight: 10 }}>
      <Styled.CardWrapper $selected={selected} onClick={(e) => { if (e.target.tagName === 'DIV') setOpenModal(true); }}>
        {gameState.isHost &&
          <Styled.ButtonRemove onClick={removeCardIssueById}>
            x
          </Styled.ButtonRemove>}
        <Styled.TitleTooltip title={issue} placement="left">
          <Styled.Title>
            {issue}
          </Styled.Title>
        </Styled.TitleTooltip>

        <Styled.ButtonWrapper>
          <ButtonMaterial classes={{ root: Styled.VotingButtonStyle({ $selected: selected }).root, label: Styled.VotingButtonStyle().label }} onClick={handleOnClick}>
            {selected ? 'Voting' : 'Vote this issue'}
          </ButtonMaterial>
          <ButtonMaterial
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            ref={anchorRef}
            aria-controls={pointPopper ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            disabled={!gameState.isHost}
          >
            {voteScore === -1 ? '-' : voteScore}
          </ButtonMaterial>
          <Popper
            open={pointPopper}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            style={{ zIndex: '2000' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={pointPopper} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Styled.PointWrapper>
                    {VotingSystem.FIBONACCI.map((point) => (
                      <Styled.MyMenuItem key={point} onClick={(e) => handleChangeVoteScore(e, point)}><Styled.PointHolder>{point}</Styled.PointHolder></Styled.MyMenuItem>
                    ))}
                  </Styled.PointWrapper>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </Styled.ButtonWrapper>
      </Styled.CardWrapper>
      {
        openModal &&
        <CardIssueModal
          issue={issue}
          cardId={cardId}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          link={link}
          description={description}
        />
      }
    </div>
  );
}

CardIssue.propTypes = propTypes;
CardIssue.defaultProps = defaultProps;

export default CardIssue;
