import styled from 'styled-components';
import { Colors } from 'constants/styles';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: ${Colors.BLACK};
  font-weight: 500;
  height: 32px;
  margin-left: -10px;
  > span a {
    color: ${Colors.GREY};
  }
`;

export const CheckboxWrapper = styled.div`
  width: 42px;
  margin-right: 4px;
`;
