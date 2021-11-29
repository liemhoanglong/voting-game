/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useSetRecoilState } from 'recoil';

import * as CardValue from 'constants/cardValue.constant';
import * as Role from 'constants/role.constant';
import { PICKED } from 'constants/cardState.constant';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './GameButton.styled';

const propTypes = {
  teamId: PropTypes.string,
  openModal: PropTypes.func,
  playingUsers: PropTypes.array,
};

const defaultProps = {
  teamId: '',
  openModal: () => {},
  playingUsers: [],
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function GameButton(props) {
  const {
    teamId,
    openModal,
    playingUsers,
  } = props;
  const classes = Styled.ShowCardButtonStyles();

  const [gameState] = useRecoilState(GameState);
  const [hasPointPlayer, setHasPointPlayer] = useState(false);
  const setGameState = useSetRecoilState(setNewGameState);

  const handleShowCard = async () => {
    try {
      await setGameState({ countDownShowCards: true });
      await teamService.showCards(teamId);
      openModal();
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };

  const handleRestartGame = async () => {
    try {
      await teamService.restartGame(teamId);
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    if (playingUsers.length > 1) {
      let checkPoint = false;
      playingUsers.forEach((user) => { if (user.cardState === PICKED && user.role !== Role.SPECTATOR) { checkPoint = true; } });
      if (checkPoint === true) {
        setHasPointPlayer(true);
      } else {
        setHasPointPlayer(false);
      }
    } else {
      setHasPointPlayer(false);
    }
  }, [playingUsers]);

  return (
    <>
      {!gameState.isHost ?
        (gameState.isCountingDown &&
          'Counting down....'
          || (gameState.role === Role.SPECTATOR ?
            'Please wait for host'
            : 'Please pick your card and wait for host'))
        : (gameState.currentPoint === CardValue.NOT_PICK || gameState.currentPoint === CardValue.SPECTATOR) ?
          (gameState.role === Role.SPECTATOR ?
            (hasPointPlayer ? (
              <ButtonMaterial
                classes={{ root: classes.root, label: classes.label }}
                reverse="true"
                onClick={gameState.gameFinish ? handleRestartGame : handleShowCard}
              >
                {gameState.gameFinish ? 'Restart game' : 'Show cards'}
              </ButtonMaterial>)
              : 'Please wait for other users')
            : 'Please pick your card') :
            <ButtonMaterial classes={{ root: classes.root, label: classes.label }} reverse="true" onClick={gameState.gameFinish ? handleRestartGame : handleShowCard}>
              {gameState.gameFinish ? 'Restart game' : 'Show cards'}
            </ButtonMaterial>}
    </>
  );
}

GameButton.propTypes = propTypes;
GameButton.defaultProps = defaultProps;

export default GameButton;
