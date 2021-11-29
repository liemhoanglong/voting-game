import { Boxshadows } from 'constants/styles/boxShadow';
import styled from 'styled-components';

export const TableWrapper = styled.div`
  max-height: 100%;
  max-width: 100%;
`;

export const TableContainer = styled.div`
  width: auto;
  height: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
  "left top right"
  "left table right"
  "left bottom right";
`;

export const TableCenter = styled.div`
  margin: auto;
  position: relative;
  grid-area: table;
  background-color: white;
  box-shadow: ${Boxshadows.PURPLE_SHADOW};
  border-radius: 16px;
  min-width: 340px;
  min-height: 150px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;
