import React, { lazy, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import * as CardValue from 'constants/cardValue.constant';
import * as Role from 'constants/role.constant';
import { ResultRowLimit } from 'constants/team';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';

import { Modal } from '@material-ui/core';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import TableCard from 'components/TableCard';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './ResultModal.styled';

const ModalLayout = lazy(() => import('layouts/ModalLayout'));

const propTypes = {
  teamId: PropTypes.string,
  openModal: PropTypes.bool,
  playingUsers: PropTypes.array,
  closeModal: PropTypes.func,
};

const defaultProps = {
  teamId: '',
  openModal: false,
  playingUsers: [],
  closeModal: () => { },
};

function ResultModal(props) {
  const {
    teamId, openModal, playingUsers, closeModal,
  } = props;
  const gameState = useRecoilValue(GameState);
  const classes = Styled.RestartButtonStyles();
  const restartButton = Styled.RestartButtonStyles({ restart: 'restart' });
  const playerInVote = playingUsers.filter((user) => (user.point !== undefined && user.role !== Role.SPECTATOR));
  const playerHasPoint = playerInVote.filter((user) => (user.point !== CardValue.NOT_PICK));
  const averageValue = playerHasPoint.reduce((value, current) => value + parseInt(current.point), 0) / playerHasPoint.length;
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const i in playerInVote) {
    if (!result[playerInVote[i].point]) {
      result[playerInVote[i].point] = [];
      result[playerInVote[i].point].push(playerInVote[i]);
    } else {
      result[playerInVote[i].point].push(playerInVote[i]);
    }
  }
  Object.keys(result).map((key) => {
    result[key].forEach((x) => x.render = x.name);
    if (result[key].length > 5) {
      result[key].slice(4, result[key].length).forEach((x) => {
        x.render = `+${parseInt(result[key].length) - ResultRowLimit} more`;
        x.more = [].concat(result[key].slice(4, result[key].length).map((a) => a.name));
        return x;
      });
    }
  });
  let mostVote = '0';

  const newResult = Object.keys(result).map((key) => [Number(key), result[key]]);
  if (newResult.length) {
    const maxPeak = newResult.reduce((p, c) => (p[1].length > c[1].length ? p : c));
    mostVote = String(maxPeak[0]);
  }

  const handleRestartGame = async () => {
    try {
      await teamService.restartGame(teamId);
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };
  const getScoreAfterVoting = () => gameState.cardIssue.find((element) => element.cardId === gameState.currentIssue).voteScore;

  const isLastIndex = () => {
    const listIndexIssue = gameState.cardIssue.reduce((x, y) => x.concat(y.cardId), []);
    const indexCurrentIssue = listIndexIssue.indexOf(gameState.currentIssue);
    return indexCurrentIssue !== (listIndexIssue.length - 1);
  };
  const handleNextVoting = async () => {
    try {
      const listIndexIssue = gameState.cardIssue.reduce((x, y) => x.concat(y.cardId), []);
      const indexCurrentIssue = listIndexIssue.indexOf(gameState.currentIssue);
      if (indexCurrentIssue === listIndexIssue.length - 1) {
        await teamService.selectCardIssue({ teamId, cardId: listIndexIssue[indexCurrentIssue], isSelect: false });
        await teamService.restartGame({ teamId });
      } else {
        await teamService.selectCardIssue({ teamId, cardId: listIndexIssue[indexCurrentIssue + 1], isSelect: true });
        await teamService.restartGame(teamId);
      }
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };
  return (
    <Modal tabIndex={-1} open={openModal} onClose={closeModal}>
      <>
        <ModalLayout closeModal={closeModal}>
          <Styled.Container>
            <Styled.CardSummary>
              {Object.keys(result).map((points, index) => (
                <Styled.CardRow key={`rows${index}`}>
                  {result[points].slice(0, 5).map((point) => (
                    <TableCard
                      inResultModal={openModal}
                      key={point.email}
                      user={point}
                    />
                  ))}
                </Styled.CardRow>
              ))}
            </Styled.CardSummary>
            <div>
              <div>
                {Object.keys(result).map((points, index) => (
                  <Fragment key={`resultPoint${index}`}>
                    <Styled.CardRow>
                      <Styled.Card mostVoted={points === mostVote}>{(points !== String(CardValue.NOT_PICK)) && points}</Styled.Card>
                      <Styled.BarContainer>
                        <Styled.BarBackground>
                          <Styled.BarFill
                            mostVoted={points === mostVote}
                            percentage={`${(result[points].length > ResultRowLimit ?
                              result[points].length + parseInt(result[points][ResultRowLimit])
                              : result[points].length) / playerInVote.length * 100}%`}
                          />
                        </Styled.BarBackground>
                        <Styled.VoteText mostVoted={points === mostVote}>
                          {result[points].length} Votes
                        </Styled.VoteText>
                      </Styled.BarContainer>
                    </Styled.CardRow>
                  </Fragment>
                ))}
              </div>
              <Styled.Result>
                <Styled.Title>
                  Average
                </Styled.Title>
                <Styled.AverageValue>
                  {Math.round(averageValue * 10) / 10}
                </Styled.AverageValue>
                {gameState.isHost ?
                  <Styled.ButtonContainerResult>
                    <ButtonMaterial classes={{ root: restartButton.root, label: restartButton.label }} onClick={handleRestartGame}>
                      Restart Game
                    </ButtonMaterial>
                    {
                      (gameState.currentIssue !== '' &&
                        (getScoreAfterVoting() === Math.round(averageValue * 10) / 10)
                        && isLastIndex())
                        ?
                          <ButtonMaterial classes={{ root: classes.root, label: classes.label }} onClick={handleNextVoting}>
                            Next voting
                          </ButtonMaterial> : ''
                    }

                  </Styled.ButtonContainerResult>
                  : <div style={{ marginTop: 15 }}>Please wait for host to restart game</div>}
              </Styled.Result>
            </div>
          </Styled.Container>
        </ModalLayout>
      </>
    </Modal>
  );
}

ResultModal.propTypes = propTypes;
ResultModal.defaultProps = defaultProps;

export default ResultModal;
