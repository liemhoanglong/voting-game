import { selector } from 'recoil';

import { Team } from './atom';

export const setNewGameState = selector({
  key: 'SetNewTeam',
  set: ({ set, get }, newValue) => {
    const currentValue = get(Team);
    set(Team, { ...currentValue, ...newValue });
  },
});
