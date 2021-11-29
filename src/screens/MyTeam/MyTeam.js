import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { userService } from 'services';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import Loading from 'components/Loading';
import Header from 'components/Header';
import * as Styled from './MyTeam.styled';

function MyTeam() {
  const history = useHistory();
  const [teamList, setTeamList] = useState([]);

  const handleClickLink = async (link) => {
    history.push(`/${link}`);
  };

  useEffect(() => {
    const getListTeam = async () => {
      try {
        const data = await userService.getTeamList();
        const teams = data.map((eachTeam) => ({
          teamId: eachTeam.teamId,
          name: eachTeam.name,
          teamLink: eachTeam.teamLink,
        }));
        setTeamList(teams);
      } catch (err) {
        Alert.error(getErrorMessage(err));
      }
    };
    getListTeam();
    return () => {
      setTeamList([]);
    };
  }, []);

  if (!teamList) {
    return <Loading />;
  }

  return (
    <>
      <Header reverse myTeam />
      <Styled.AllTeamContainer>
        <Styled.Title>Your Team List</Styled.Title>
        {teamList.map((eachTeam) => (
          <Styled.TeamContainer key={eachTeam.teamId}>
            <Styled.NameTeam>
              <b>{eachTeam.name}</b>
            </Styled.NameTeam>
            <ButtonMaterial onClick={() => handleClickLink(eachTeam.teamLink)}>
              <Styled.ButtonRoom>
                Go to game room
              </Styled.ButtonRoom>
            </ButtonMaterial>
          </Styled.TeamContainer>))}
      </Styled.AllTeamContainer>
    </>
  );
}

export default MyTeam;
