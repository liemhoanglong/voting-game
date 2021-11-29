import styled from 'styled-components';
import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const AllTeamContainer = styled.div`
  margin: auto;
  margin-top: 100px;
  background-color: ${Colors.WHITE};
  width: 50%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  box-shadow:${Boxshadows.DARK_SHADOW}

  @media (max-width: 992px) {
    width: 60%;
     margin-top: 120px;
  }
`;

export const TeamContainer = styled.div`
  height: 100px;
  width: 70%;
  padding: 0 30px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.WHITE};
  border: 2px solid ${Colors.CLOUDY_BLUE};
  font-weight: 600;
  box-shadow:${Boxshadows.DARK_SHADOW};
  @media (max-width: 992px) {
    width: 80%;
    height: 70px;
  }
`;

export const NameTeam = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 20px;
  margin-right: 11px;

  @media (max-width: 992px) {
    font-size: 15px;
  }
`;

export const ButtonRoom = styled.div`
  font-size: 16px;

  @media (max-width: 992px) {
    font-size: 13px;
  }
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 992px) {
    font-size: 22px;
    font-weight: bold;
  }
`;
