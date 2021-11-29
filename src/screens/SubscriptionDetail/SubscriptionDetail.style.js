import styled from 'styled-components';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const InvoiceListContainer = styled.div`
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

export const InvoiceContainer = styled.div`
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
