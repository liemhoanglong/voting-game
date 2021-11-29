import { atom } from 'recoil';

export const Team = atom({
  key: 'Team',
  default: {},
  persistence_UNSTABLE: {
    type: 'log',
  },
});
