import { atom } from 'recoil';

export const Toast = atom({
  key: 'Toast',
  default: {
    type: 'info',
    open: false,
    message: '',
  },
});
