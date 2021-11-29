import styled from 'styled-components';
import { Colors } from 'constants/styles';

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ selected }) => selected && Colors.CATSKILL_WHITE};
  opacity: ${({ disabled }) => disabled && 0.5};
  &:hover {
    background-color: ${({ disabled }) => !disabled && Colors.CATSKILL_WHITE};
  }

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'auto')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.3s ease-in;
    opacity: 0;
    ${({ disabled }) => disabled && `
      z-index: 1;
      opacity: 1;
      cursor: default;
    `}
  }
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${Colors.CLOUDY_BLUE};
  margin-right: 12px;
  background-color: ${Colors.CLOUDY_BLUE};
  color: ${Colors.BLACK};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const Title = styled.p`
  margin: 0;
  text-align: left;
  font-weight: 700;
  font-size: 16px;

  ${({ $hasName }) => !$hasName && `
    color: ${Colors.POMEGRANATE};
  `};
`;

export const Description = styled.p`
  margin: 0;
  text-align: left;
  color: ${Colors.GREY};
  font-size: 14px;
  font-weight: 600;
`;
