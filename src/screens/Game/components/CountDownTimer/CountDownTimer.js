import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useTimer } from 'hooks';

import * as Role from 'constants/role.constant';
import * as CardValue from 'constants/cardValue.constant';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import TimeSelectButton from '../TimerSelectButton';
import * as Styled from './CountDownTimer.styled';

const propTypes = {
  teamId: PropTypes.string,
};

const defaultProps = {
  teamId: '',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function CountDownTimer(props) {
  const { teamId } = props;
  const [timeLeft, setTimeLeft] = useTimer();
  const [timerModalOpen, setTimeModalOpen] = useState(false);
  const [time, setTime] = useState(15);
  const anchorRef = useRef(null);
  const gameState = useRecoilValue(GameState);

  const timeArray = [15, 30, 45];

  const handleStartTimer = async (e, timeSecond) => {
    e.preventDefault();
    setTimeModalOpen(!timerModalOpen);
    try {
      await teamService.startTimer(teamId, timeSecond);
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };

  const handleResetTimer = (timeSecond) => async (event) => {
    event.preventDefault();
    setTimeModalOpen(!timerModalOpen);
    if (timeSecond === gameState.countDownTime) {
      try {
        await teamService.startTimer(teamId, 0);
      } catch (err) {
        Alert.error(getErrorMessage(err));
      }
    }
    try {
      await teamService.startTimer(teamId, timeSecond);
    } catch (err) {
      Alert.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    if (gameState.isCountingDown) {
      setTimeLeft(gameState.countDownTime);
    } else {
      setTimeLeft(0);
      if (gameState.doneCountDown && gameState.isHost) {
        const pointToSend =
          gameState.role === Role.SPECTATOR
            ? CardValue.SPECTATOR
            : gameState.currentPoint;
        teamService.pickCardAndShow(teamId, pointToSend);
      }
    }
  }, [gameState.isCountingDown]);

  const handleTimerClick = () => {
    if (gameState.isHost && !gameState.gameFinish) {
      setTimeModalOpen(!timerModalOpen);
    }
  };
  const calculateTimePercent = (time) => Math.round((time / gameState.totalTime) * 100);
  const getTitle = (host) => {
    if (host) {
      return 'Activate Timer';
    }
    return 'Only Host Can Start Timer';
  };
  const classes = Styled.TimerButtonStyles();
  return (
    <Styled.TableWrapper>
      <Styled.Permission>
        {gameState.isHost ? <h2>Host</h2> : <h2>Member</h2>}
      </Styled.Permission>
      <Styled.TimerTooltip
        title={
          // eslint-disable-next-line no-nested-ternary
          gameState.isCountingDown ? Math.round(timeLeft) : getTitle(gameState.isHost)

        }
        placement="right"
      >
        <ButtonMaterial
          classes={{
            root: classes.root,
          }}
          ref={anchorRef}
          onClick={handleTimerClick}
          aria-controls={timerModalOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          {gameState.isCountingDown ? (
            <Styled.TimerCircle
              variant="determinate"
              value={calculateTimePercent(timeLeft)}
              thickness={22}
            />
          ) : (
            <Styled.MyTimerIcon />
          )}
        </ButtonMaterial>
      </Styled.TimerTooltip>
      <Popper
        open={timerModalOpen}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: '1000' }}
      >
        <ClickAwayListener onClickAway={() => setTimeModalOpen(false)}>
          {gameState.isCountingDown ? (
            <Paper>
              <MenuList autoFocusItem={timerModalOpen}>
                <MenuItem onClick={handleResetTimer(gameState.countDownTime)}>
                  Restart Timer
                </MenuItem>
                <MenuItem onClick={handleResetTimer(0)}>Cancel Timer</MenuItem>
              </MenuList>
            </Paper>
          ) : (
            <Styled.TimerConfig>
              {timeArray.map((eachTime) => (
                <TimeSelectButton
                  key={eachTime}
                  time={eachTime}
                  selected={eachTime === time}
                  onClick={() => setTime(eachTime)}
                />
              ))}
              <ButtonMaterial
                type="submit"
                fullWidth
                onClick={(e) => handleStartTimer(e, time)}
              >
                ▶ Start Timer
              </ButtonMaterial>
            </Styled.TimerConfig>
          )}
        </ClickAwayListener>
      </Popper>
    </Styled.TableWrapper>
  );
}

CountDownTimer.propTypes = propTypes;
CountDownTimer.defaultProps = defaultProps;

export default CountDownTimer;
