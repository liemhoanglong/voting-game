import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSound from 'use-sound';
import Swal from 'sweetalert2';
import * as workerTimers from 'worker-timers';

import * as CardValue from 'constants/cardValue.constant';
import * as Role from 'constants/role.constant';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';
import CountDownSound from 'assets/sounds/count-down-time.mp3';

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);
  const [play, { stop }] = useSound(CountDownSound, { interrupt: true });

  useEffect(() => {
    if (timeLeft <= 0 && gameState.isCountingDown === true) {
      stop();
      if (gameState.currentPoint === CardValue.NOT_PICK && !gameState.isHost && gameState.role !== Role.SPECTATOR) {
        Swal.fire({
          icon: 'error',
          title: 'You haven\'t picked your card',
          text: 'Please pick your card!',
        });
      }
      setGameState({ isCountingDown: false, doneCountDown: true });
      return;
    }
    if (timeLeft === -1) {
      return;
    }
    if (timeLeft === 3 && gameState.currentPoint === CardValue.NOT_PICK && (gameState.role !== Role.SPECTATOR)) {
      play();
    }
    if (gameState.currentPoint !== CardValue.NOT_PICK) {
      stop();
    }
    const intervalId = workerTimers.setTimeout(() => {
      setTimeLeft(timeLeft - 0.5);
    }, 500);

    return () => {
      workerTimers.clearTimeout(intervalId);
    };
  }, [timeLeft]);

  return [timeLeft, setTimeLeft];
};
