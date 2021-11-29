import { atom } from 'recoil';
import { MEMBER } from 'constants/role.constant';
import { NOT_PICK } from 'constants/cardValue.constant';

export const GameState = atom({
  key: 'GameState',
  default: {
    loadedStateGame: false, // check user change state is done for skeleton
    gameFinish: false,
    countDownTime: 0,
    totalTime: 0,
    currentPoint: NOT_PICK,
    role: MEMBER,
    isCountingDown: false,
    doneCountDown: false,
    countDownShowCards: false,
    isHost: false,
    cardIssue: [],
    currentIssue: '',
  },
  persistence_UNSTABLE: {
    type: 'log',
  },
});
