import { selector } from 'recoil';

import { GameState } from './atom';

export const setNewGameState = selector({
  key: 'SetNewGameState',
  set: ({ set, get }, newValue) => {
    const currentValue = get(GameState);
    set(GameState, { ...currentValue, ...newValue });
  },
});
