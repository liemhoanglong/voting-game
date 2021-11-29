import styled, { css } from 'styled-components';
import { Colors } from 'constants/styles';

export const Container = styled.div`
  background-color: ${Colors.WHITE};
  border: 1px solid ${Colors.CLOUDY_BLUE};
  box-shadow: 0 6px 18px -7px #5e88b3;
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;

  ${(props) => (props.$width && css`
    width: ${props.$width}px;
  `)}
  ${(props) => (props.$minHeight && css`
    min-height: ${props.$minHeight}px;
  `)}
`;

export const LoadingContainer = styled.div`
  padding: 0 8px;
`;

export const AddedText = styled.span`
  color: ${Colors.POMEGRANATE};
  font-size: 12px;
  font-weight: 700;
`;

export const NoUserFoundText = styled.span`
  padding: 0 16px;
  color: ${Colors.GREY};
  font-size: 16px;
  font-weight: 600;
`;
