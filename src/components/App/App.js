import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import environment from 'constants/environment';

import { userService } from 'services';
import { User } from 'recoils/user/atom';

import './App.scss';
import AppRouter from 'navigation/Router';

function App() {
  const setUser = useSetRecoilState(User);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await userService.checkToken();
      } catch (err) {
        localStorage.clear();
        setUser(null);
      }
    };
    console.log(`%c POKER Version: ${environment.BUILD_NUMBER}`, 'color:#ed3d48;font-family:system-ui;font-size:15px;');
    checkToken();
  }, [setUser]);
  return (
    <div className="App">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
