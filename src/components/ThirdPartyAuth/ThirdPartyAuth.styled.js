import styled from 'styled-components';

import { Colors } from 'constants/styles';

export const DivideContainer = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${Colors.BLACK};
  display: flex;
  align-items: center;
  width: 80px;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: -10px;
  padding: 16px;
  > span {
    font-weight: 600;
    flex: 2 1;
  }
  > hr {
    flex: 1 1;
    background-color: ${Colors.CLOUDY_BLUE};
    border: none;
    height: 1px;
  }
`;
