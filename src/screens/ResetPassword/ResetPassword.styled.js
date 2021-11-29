import styled from 'styled-components';

import { Colors } from 'constants/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Colors.LIGHT_BLUE};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  box-sizing: border-box;
  width: 440px;
  background-color: ${Colors.WHITE};
  border-radius: 16px;
  padding: 48px;
  max-height: calc(100vh);
  overflow: hidden;
  position: relative;
  box-shadow: ${Boxshadows.PURPLE_SHADOW};
`;

export const Title = styled.div`
  margin: 0px 0 20px;
  font-size: 32px;
  text-align: center;
  font-weight: 500;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const CheckboxWrapper = styled.div`
  width: 32px;
  margin-right: 4px;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

export const ServerError = styled.p`
  font-size: 12px;
  color: ${Colors.POMEGRANATE};
  margin: 20px 0;
`;
