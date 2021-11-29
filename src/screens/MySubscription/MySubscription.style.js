import styled from 'styled-components';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const SubscriptionListContainer = styled.div`
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: ${Colors.WHITE};
  width: 50%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow:${Boxshadows.DARK_SHADOW}
  @media (max-width: 992px) {
    width: 60%;
    margin-top: 120px;
  }
`;

export const SubscriptionContainer = styled.div`
  padding: 30px;
  margin-top: 40px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${Colors.WHITE};
  border: 2px solid ${Colors.CLOUDY_BLUE};
  font-weight: 600;
  @media (max-width: 992px) {
    width: 80%;
    height: 70px;
  }
`;

export const ButtonTransparentBlue = styled.button`
  background-color: transparent;
  color: #F50057;
  border: none;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  :hover {
    color: #fc4e8c;
  }
`;

export const ButtonTransparentRed = styled.button`
  background-color: transparent;
  color: #3993ff;
  border: none;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  :hover {
    color: #74b3ff;
  }
`;
