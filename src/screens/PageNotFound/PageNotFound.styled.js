import styled from 'styled-components';

import { Colors } from 'constants/styles';
import ButtonMaterial from 'components/Shared/ButtonMaterial';

export const Wrapper = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  height: 100vh;
  margin: auto;
  padding: 0 16px;
`;

export const Img = styled.img`
  width: 320px;
  height: 320px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: .5px;
  margin-bottom: 12px;
  margin-top: -50px;
`;

export const Message = styled.span`
  font-size: 14px;
  color: ${Colors.GREY};
  margin-bottom: 24px;
  margin-top: -5px;
`;

export const GoToHomeButton = styled(ButtonMaterial)`
  width: 150px !important;
  margin: 0 auto !important;
  font-size: 16px !important;
  font-weight: 600 !important;
`;
