import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const RoleSelectStyles = makeStyles({
  label: {
    fontSize: '16px',
    fontWeight: 600,
  },
});

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${Colors.GREY};
  margin-right: 12px;
  background-color: ${Colors.CLOUDY_BLUE};
  color: ${Colors.BLACK};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
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

export const DivideRoleSelector = styled.div`
    background-color: rgba(39,61,87,.1);
    border: none;
    height: 1px;
`;

export const TextWarning = styled.p`
    font-weight: 600;
    color: ${Colors.POMEGRANATE};
    margin: 0 0;
`;
