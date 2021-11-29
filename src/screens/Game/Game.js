import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Scrollbars as Scrollbar } from 'react-custom-scrollbars';

import * as CardState from 'constants/cardState.constant';

import { Team } from 'recoils/team/atom';

import CardSidebar from 'components/CardSidebar';
import Sidebar from 'components/Sidebar';
import HandCards from 'components/HandCards';
import Loading from 'components/Loading';
import Header from 'components/Header';
import Table from './components/Table';
import CountDownTimer from './components/CountDownTimer';
import * as Styled from './Game.styled';

import useGetGameState from './hooks/useGetGameState';

export const showRightSideBar = React.createContext();

function Game() {
  const crrUrl = window.location.href;
  const teamId = crrUrl.split('-')[crrUrl.split('-').length - 1];
  const [playingUsers, setPlayingUsers] = useState([]);
  const [team, setTeam] = useRecoilState(Team);

  const setTeamState = (cardState, index) => {
    const tempUserList = team.users?.map((a) => ({ ...a }));
    tempUserList[index].cardState = cardState;
    setTeam({ ...team, users: tempUserList });
  };
  const [rightSideBar, setRightSideBar] = useState(false);

  const updatePlayingUser = (userAction, playingUsers) => {
    let tempUserList = [...playingUsers];
    const indexInPlayingUsers = playingUsers.findIndex(((user) => user.userId === userAction._id));
    const indexInAllUsers = team.users?.findIndex(((user) => user.userId === userAction._id));
    setTeamState(userAction.cardState, indexInAllUsers);
    if (indexInPlayingUsers === -1) {
      const tempUser = { ...team.users[indexInAllUsers], cardState: userAction.cardState };
      tempUserList.push(tempUser);
    } else if (userAction.cardState === CardState.OFFLINE) {
      tempUserList = tempUserList.filter((user) => user.userId !== userAction._id);
    } else {
      tempUserList[indexInPlayingUsers] = { ...tempUserList[indexInPlayingUsers], cardState: userAction.cardState };
    }
    return tempUserList;
  };

  useGetGameState({ teamId, setPlayingUsers });

  const styles = {
    marginTop: '30px',
  };

  if (!team.users) {
    return <Loading />;
  }

  return (
    <showRightSideBar.Provider value={
      {
        show: rightSideBar,
        setRightSideBar,
      }
    }
    >

      <Styled.GameWrapper>
        <Sidebar />
        <Styled.GameContent>
          <Header inGame />
          <Scrollbar
            style={styles}
            autoHide
            hideTracksWhenNotNeeded
          >
            <Styled.ContainWrapper>
              <CountDownTimer teamId={teamId} />
              {team.users?.length &&
                <Table
                  teamId={teamId}
                  updatePlayingUser={updatePlayingUser}
                  playingUsers={playingUsers}
                  setPlayingUsers={setPlayingUsers}
                />}
              <HandCards teamId={teamId} />
            </Styled.ContainWrapper>
          </Scrollbar>
        </Styled.GameContent>
        <CardSidebar />
      </Styled.GameWrapper>
    </showRightSideBar.Provider>
  );
}

export default Game;
