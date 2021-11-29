import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { unstable_batchedUpdates } from 'react-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { RouteUrl } from 'constants/router';
import * as CardState from 'constants/cardState.constant';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';
import { Team } from 'recoils/team/atom';

useGetGameState.propTypes = {

};

function useGetGameState({ setPlayingUsers, teamId }) {
  const history = useHistory();
  const resetGame = useResetRecoilState(GameState);
  const resetTeam = useResetRecoilState(Team);
  const setGameState = useSetRecoilState(setNewGameState);
  const [, setTeam] = useRecoilState(Team);

  useEffect(() => {
    const getGameState = async () => {
      try {
        const {
          name,
          urlImage,
          allUserState,
          currentPoint,
          role,
          isHost,
          currentCard,
        } = await teamService.getGameState(teamId);
        const users = allUserState.map((user) => ({
          name: user.name,
          email: user.email,
          userId: user._id,
          role: user.role,
          isHost: user.isHost,
          cardState: user.cardState,
        }));
        setPlayingUsers(users.filter((user) => (user.cardState !== CardState.OFFLINE)).map((user) => ({ ...user })));
        setGameState({
          role, currentPoint, isHost, currentIssue: currentCard,
        });
        setTeam({
          name, urlImage, users,
        });
      } catch (error) {
        history.push(RouteUrl.PAGE_NOT_FOUND);
      }
    };
    getGameState();
    return () => {
      unstable_batchedUpdates(() => {
        resetTeam();
        resetGame();
        setPlayingUsers([]);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, setPlayingUsers, history]);
}

export default useGetGameState;
