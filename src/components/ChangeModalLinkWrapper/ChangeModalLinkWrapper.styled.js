import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Colors } from 'constants/styles';

export const Link = styled(RouterLink)`
  text-decoration: none;
  margin: 0;
  font-weight: 500;
  margin-left: 5px;
  color: ${Colors.DODGER_BLUE};
`;

export const LinkWrapper = styled.div`
  display: flex;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  /* margin: 0px 0 30px 0; */
  margin-top: ${(props) => (props.mt ? props.mt : '0px')};
  margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
  color: ${Colors.GREY}
`;
