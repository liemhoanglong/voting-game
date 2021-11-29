import styled from 'styled-components';
import { Colors } from 'constants/styles';

export const HandCardsWrapper = styled.div`
  transition: .25s ease-in-out;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  bottom:0;
  height: 180px;
  width: 100%;
  overflow: hidden;
  height: ${(props) => (props.$hide ? '0' : '180px')};
`;

export const CardHolder = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.span`
  color: ${Colors.BLACK};
  font-size: 18px;
  font-weight: 400;
`;
