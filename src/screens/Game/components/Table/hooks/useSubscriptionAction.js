import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import _ from 'lodash';
import useSound from 'use-sound';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import * as GameCode from 'constants/gameCode.constant';
import * as CardState from 'constants/cardState.constant';
import * as CardValue from 'constants/cardValue.constant';
import * as Role from 'constants/role.constant';
import { RouteUrl } from 'constants/router';

import { GameState } from 'recoils/gameState/atom';
import { Team } from 'recoils/team/atom';
import { setNewGameState } from 'recoils/gameState/selector';

import * as Alert from 'utils/alert.util';

import PingSound from 'assets/sounds/ping-sound.mp3';

function useSubscriptionAction({
  playingUsers,
  setPlayingUsers,
  setOpenModalResult,
  _data,
  updatePlayingUser,
  setCountdownShowCard,
  setShowCardData,
  setTimerShowCard,
}) {
  const [team, setTeam] = useRecoilState(Team);
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);

  const [playPingSound] = useSound(PingSound, { interrupt: true });
  const history = useHistory();

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

  // const onSubscriptionReceived = (_data) => {
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
  // };
}

export default useSubscriptionAction;
