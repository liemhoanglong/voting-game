import { LocalStorageKey } from 'constants/localStorage';
import { atom } from 'recoil';

const localStorageEffect = () => ({ setSelf }) => {
  const name = localStorage.getItem(LocalStorageKey.NAME);
  const token = localStorage.getItem(LocalStorageKey.TOKEN);
  const email = localStorage.getItem(LocalStorageKey.EMAIL);

  if (name && token && email) {
    setSelf({ name, token, email });
  }
};

export const User = atom({
  key: 'User',
  default: null,
  // persistence_UNSTABLE: {
  //   type: 'log',
  // },
  effects_UNSTABLE: [
    localStorageEffect(),
  ],
});
