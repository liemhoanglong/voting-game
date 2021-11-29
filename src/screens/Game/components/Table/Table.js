import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useSubscription } from '@apollo/client';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import * as workerTimers from 'worker-timers';
import Swal from 'sweetalert2';

import { RouteUrl } from 'constants/router';
import * as GameCode from 'constants/gameCode.constant';
import * as CardState from 'constants/cardState.constant';
import * as CardValue from 'constants/cardValue.constant';
import * as Role from 'constants/role.constant';
import { SUBSCRIBE_TO_GAME } from 'graphQL/teamGraph';

import { GameState } from 'recoils/gameState/atom';
import { Team } from 'recoils/team/atom';
import { setNewGameState } from 'recoils/gameState/selector';
import PingSound from 'assets/sounds/ping-sound.mp3';

import * as Alert from 'utils/alert.util';
import { arrangeTable } from 'utils/arrangeTable.util';

import ResultModal from 'components/ResultModal';
import GameButton from '../GameButton';
import TableCardList from '../TableCardList';
import * as Styled from './Table.styled';

// import SubscriptionAction from './hooks/subscriptionAction';
const propTypes = {
  updatePlayingUser: PropTypes.func,
  playingUsers: PropTypes.array,
  setPlayingUsers: PropTypes.func,
  teamId: PropTypes.string,
};

const defaultProps = {
  updatePlayingUser: () => { },
  playingUsers: [],
  setPlayingUsers: () => { },
  teamId: '',
};

function Table(props) {
  const {
    updatePlayingUser,
    teamId,
    playingUsers,
    setPlayingUsers,
  } = props;
  const history = useHistory();
  const [team, setTeam] = useRecoilState(Team);
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);
  const [countdownShowCard, setCountdownShowCard] = useState(false);
  const [timerShowCard, setTimerShowCard] = useState(0);
  useSubscription(
    SUBSCRIBE_TO_GAME,
    {
      variables: {
        teamId,
      },
      fetchPolicy: 'no-cache',
      onSubscriptionData: ({ subscriptionData }) => {
        onSubscriptionReceived(subscriptionData.data);
      },
    },
  );

  const [topUsers, setTopUsers] = useState([]);
  const [bottomUsers, setBottomUsers] = useState([]);
  const [leftUsers, setLeftUsers] = useState([]);
  const [rightUsers, setRightUsers] = useState([]);
  const [showCardData, setShowCardData] = useState({});
  const [openModalResult, setOpenModalResult] = useState(false);
  const [playPingSound] = useSound(PingSound, { interrupt: true });

  const handleReceiveShowCard = (data) => {
    const { cardIssue, cardValues } = data.subscribeToGame;
    if (cardIssue && data.subscribeToGame.code === GameCode.SHOW_CARDS_EQUAL) {
      const voteScore = cardValues.find((eachCard) => (eachCard.point !== CardValue.SPECTATOR)).point;
      updateCardIssue({ _id: cardIssue._id, voteScore });
    }
    const tempPlayingUsers = [...playingUsers];
    const cardValuesObject = {};
    cardValues.forEach((card) => cardValuesObject[card._id] = card.point);
    tempPlayingUsers.forEach((user) => user.point = cardValuesObject[user.userId]);
    setPlayingUsers(tempPlayingUsers);
  };

  const addMember = (data) => {
    const tempAllUser = [...team.users];
    const { newMember } = data.subscribeToGame;
    newMember.forEach((newUser) => {
      tempAllUser.push({
        name: newUser.name,
        email: newUser.email,
        userId: newUser.userId,
        role: newUser.role,
        isHost: false,
        cardState: CardState.OFFLINE,
      });
    });
    setTeam({ ...team, users: tempAllUser });
  };

  const restartGame = async () => {
    await setOpenModalResult(false);
    setGameState({ gameFinish: false, doneCountDown: false, currentPoint: CardValue.NOT_PICK });
    const tempPlayingUsers = [...playingUsers];
    tempPlayingUsers.forEach((user) => {
      user.point = null;
      user.cardState = CardState.NOT_PICK;
    });
    setPlayingUsers(tempPlayingUsers);
  };

  const changeSelfRole = async (userAction) => {
    if (userAction.role !== -1) {
      const newCardValue = userAction.role === Role.SPECTATOR ? CardValue.SPECTATOR : CardValue.NOT_PICK;
      setGameState({ currentPoint: newCardValue, role: userAction.role });
      Alert.success('Your role has been changed');
      return;
    }
    Swal.fire({
      text: 'Your has been kick out by host!',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(RouteUrl.HOME);
      }
    });
  };

  const updateCardIssueAfterRemove = (cardId) => {
    let tempCardIssueList = [...gameState.cardIssue];
    tempCardIssueList = tempCardIssueList.filter((card) => card.cardId !== cardId);
    setGameState({ cardIssue: tempCardIssueList });
  };
  const updateCardIssue = (cardIssue) => {
    const tempCardIssueList = [...gameState.cardIssue];
    const indexCardIssue = gameState.cardIssue.findIndex(((card) => card.cardId === cardIssue._id));
    if (indexCardIssue !== -1) {
      tempCardIssueList[indexCardIssue] = { ...tempCardIssueList[indexCardIssue], ...cardIssue, cardId: cardIssue._id };
    }
    setGameState({ cardIssue: tempCardIssueList });
  };
  const changeHostTeam = async (userAction) => {
    const tempPlayingUserList = [...playingUsers];
    const indexInPlayingUsers = await playingUsers.findIndex(((user) => user.userId === userAction._id));
    tempPlayingUserList.map((x) => x.isHost = false);
    tempPlayingUserList[indexInPlayingUsers] = {
      ...tempPlayingUserList[indexInPlayingUsers],
      isHost: true,
    };
    const indexUserChangeHost = team.users?.findIndex(((user) => user.userId === userAction._id));
    const tempUserList = _.cloneDeep(team.users);
    tempUserList.forEach((b) => b.isHost = false);
    tempUserList[indexUserChangeHost].isHost = true;
    setTeam({ ...team, users: tempUserList });
    await setPlayingUsers(tempPlayingUserList);
  };
  const changeRoleUser = async (userAction) => {
    let tempPlayingUserList = [...playingUsers];
    let tempAllUser = [...team.users];
    const indexInPlayingUsers = await playingUsers.findIndex(((user) => user.userId === userAction._id));
    const indexInAllUsers = await team.users?.findIndex(((user) => user.userId === userAction._id));
    if (userAction.role !== -1) {
      tempPlayingUserList[indexInPlayingUsers] = {
        ...tempPlayingUserList[indexInPlayingUsers],
        role: userAction.role,
        card: CardState.NOT_PICK,
      };
      tempAllUser[indexInAllUsers] = {
        ...tempAllUser[indexInAllUsers],
        role: userAction.role,
        card: CardState.NOT_PICK,
      };
    } else {
      tempPlayingUserList = tempPlayingUserList.filter((user) => user.userId !== userAction._id);
      tempAllUser = tempAllUser.filter((user) => user.userId !== userAction._id);
    }
    setTeam({ ...team, users: tempAllUser });
    await setPlayingUsers(tempPlayingUserList);
  };

  const onSubscriptionReceived = (_data) => {
    switch (_data.subscribeToGame.code) {
      case GameCode.USER_CHANGE_STATE: {
        setPlayingUsers(updatePlayingUser(_data.subscribeToGame.userAction, playingUsers));
        break;
      }
      case GameCode.SHOW_CARDS_EQUAL:
      case GameCode.SHOW_CARDS_NOT_EQUAL:
      case GameCode.SHOW_CARDS: {
        setGameState({ gameFinish: true, countDownShowCards: true });
        setCountdownShowCard(true);
        setShowCardData(_data);
        setTimerShowCard(3);
        break;
      }
      case GameCode.RESTART_GAME: {
        restartGame();
        break;
      }
      case GameCode.USER_CURRENT_POINT: {
        setGameState({ currentPoint: _data.subscribeToGame.currentPoint });
        break;
      }
      case GameCode.START_TIMER: {
        const timeSubscription = _data.subscribeToGame.timer.timer;
        if (timeSubscription > 0) {
          setGameState({
            countDownTime: timeSubscription,
            totalTime: timeSubscription,
            isCountingDown: true,
          });
        } else {
          setGameState({ countDownTime: 0, totalTime: 0, isCountingDown: false });
        }
        break;
      }
      case GameCode.TIMER_LEFT: {
        const timeLeft = _data.subscribeToGame.timer.timerLeft;
        const totalTime = _data.subscribeToGame.timer.timer;
        setGameState({ isCountingDown: true, countDownTime: timeLeft, totalTime });
        break;
      }
      case GameCode.IS_HOST: {
        setGameState({ isHost: true });
        Alert.success('You become new host');
        break;
      }
      case GameCode.INACTIVE_HOST: {
        setGameState({ isHost: false });
        Alert.success('Transfer host success');
        break;
      }
      case GameCode.CHANGE_HOST_TEAM: {
        changeHostTeam(_data.subscribeToGame.userAction);
        break;
      }
      case GameCode.CHANGE_ROLE: {
        changeRoleUser(_data.subscribeToGame.userAction);
        break;
      }
      case GameCode.SELF_CHANGE_ROLE: {
        changeSelfRole(_data.subscribeToGame.userAction);
        break;
      }
      case GameCode.ADD_MEMBER: {
        addMember(_data);
        break;
      }
      case GameCode.PING: {
        Alert.warning('Please pick you card');
        playPingSound();
        break;
      }
      case GameCode.ADD_CARD: {
        const newListCard = _data.subscribeToGame.cardIssue;
        setGameState({ cardIssue: [...gameState.cardIssue, { ...newListCard, cardId: newListCard._id }] });
        break;
      }
      case GameCode.IMPORT_CARD: {
        const newListCard = _data.subscribeToGame.cardIssues;
        const newListCardTemp = [];
        // ! Change _id to cardId
        newListCard.forEach((card) => {
          newListCardTemp.push(card);
          newListCardTemp[newListCardTemp.length - 1].cardId = card._id;
          delete newListCardTemp[newListCardTemp.length - 1]._id;
        });
        setGameState({ cardIssue: gameState.cardIssue.concat(newListCardTemp) });
        break;
      }
      case GameCode.UPDATE_CARD: {
        updateCardIssue(_data.subscribeToGame.cardIssue);
        break;
      }
      case GameCode.REMOVE_ALL_CARD: {
        setGameState({ cardIssue: [] });
        break;
      }
      case GameCode.REMOVE_CARD_BY_ID: {
        updateCardIssueAfterRemove(_data.subscribeToGame.cardIssue._id);
        break;
      }
      case GameCode.SELECT_CARD: {
        setGameState({ currentIssue: _data.subscribeToGame.cardIssue._id });
        break;
      }
      case GameCode.DESELECT_CARD: {
        setGameState({ currentIssue: '' });
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (timerShowCard <= 0) {
      if (gameState.gameFinish) {
        handleReceiveShowCard(showCardData);
        setOpenModalResult(true);
      }
      setCountdownShowCard(false);
      setGameState({ countDownShowCards: false });
      return;
    }
    const intervalId = workerTimers.setTimeout(() => {
      setTimerShowCard(timerShowCard - 1);
    }, 1000);

    return () => {
      workerTimers.clearTimeout(intervalId);
    };
  }, [timerShowCard]);
  useEffect(() => {
    const {
      arrTop, arrBottom, arrLeft, arrRight,
    } = arrangeTable(playingUsers);

    setTopUsers(arrTop);
    setBottomUsers(arrBottom);
    setLeftUsers(arrLeft);
    setRightUsers(arrRight);
  }, [playingUsers]);
  return (
    <Styled.TableWrapper>
      {openModalResult &&
        <ResultModal
          teamId={teamId}
          openModal={openModalResult}
          playingUsers={playingUsers}
          closeModal={() => setOpenModalResult(false)}
        />}
      <Styled.TableContainer>
        <div />
        <TableCardList
          users={topUsers}
          teamId={teamId}
          top
        />
        <div />
        <TableCardList
          users={leftUsers}
          teamId={teamId}
          left
        />
        <Styled.TableCenter>
          {countdownShowCard ? <h2>{timerShowCard}</h2> : <GameButton playingUsers={playingUsers} teamId={teamId} />}
        </Styled.TableCenter>
        <TableCardList
          users={rightUsers}
          teamId={teamId}
          right
        />
        <div />
        <TableCardList
          users={bottomUsers}
          teamId={teamId}
          bottom
        />
        <div />
      </Styled.TableContainer>
    </Styled.TableWrapper>
  );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default React.memo(Table);
