import styled from 'styled-components';

import { Colors } from 'constants/styles';

export const GameContent = styled.div`
  width: calc(100%);
`;
export const GameWrapper = styled.div`
  height: calc(100vh - 180px);
  width: 100vw;
  background-color: ${Colors.LIGHT_BLUE};
  display: flex;
  flex-direction: row;
`;

export const ContainWrapper = styled.div`
  vertical-align: middle;
  flex-direction: column;
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: calc(100%);
`;
