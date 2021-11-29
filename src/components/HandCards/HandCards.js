import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as Role from 'constants/role.constant';
import * as CardValue from 'constants/cardValue.constant';
import * as VotingSystem from 'constants/votingSystem.constant';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import Card from 'components/Card';
import * as Styled from './HandCards.styled';

const propTypes = {
  teamId: PropTypes.string,
};

const defaultProps = {
  teamId: '',
};

function HandCards(props) {
  const { teamId } = props;
  const pointArray = VotingSystem.FIBONACCI;
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);

  const handleSelectPoint = (e, point) => {
    e.preventDefault();

    const currentPoint = point === gameState.currentPoint ? CardValue.NOT_PICK : point;
    setGameState({ currentPoint });

    try {
      if (gameState.doneCountDown && !gameState.isCountingDown) {
        teamService.pickCardAndShow(teamId, currentPoint);
      } else {
        teamService.pickCard(teamId, currentPoint);
      }
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    if (!gameState.gameFinish) {
      const currentPoint = gameState.role === Role.SPECTATOR ? CardValue.SPECTATOR : CardValue.NOT_PICK;
      setGameState({ currentPoint });
    }
  }, [gameState.gameFinish, gameState.role, setGameState]);

  return (
    <Styled.HandCardsWrapper $hide={gameState.gameFinish}>
      {gameState.role === Role.SPECTATOR ? <Styled.TextWrapper>You are in spectator mode 👁</Styled.TextWrapper> : (
        <>
          <Styled.TextWrapper>Choose your card 👇</Styled.TextWrapper>
          <Styled.CardHolder>
            {pointArray.map((point) => (
              <Card
                key={point}
                onClick={(e) => handleSelectPoint(e, point)}
                point={point}
                selected={point === gameState.currentPoint}
              />))}
          </Styled.CardHolder>
        </>
      )}
    </Styled.HandCardsWrapper>
  );
}

HandCards.propTypes = propTypes;
HandCards.defaultProps = defaultProps;

export default HandCards;
