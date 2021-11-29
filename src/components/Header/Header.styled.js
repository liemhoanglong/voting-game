import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Boxshadows } from 'constants/styles/boxShadow';
import { Colors } from 'constants/styles';

export const HeaderContainer = styled.div`
  position: relative;
  height: 80px;
  display: flex;
  justify-content: ${(props) => (props.transparent ? 'flex-end' : 'space-between')};
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${(props) => (props.$light ? Colors.WHITE : Colors.TRANSPARENT)};
  background-color: ${(props) => (props.transparent && Colors.TRANSPARENT)};
  box-shadow: ${(props) => (props.$light ? Boxshadows.GREY_SHADOW : 'none')};
  box-shadow: ${(props) => (props.transparent && 'none')};
`;

export const Logo = styled.img`
  padding-left: 40px;
  width: 245px;
  height: 54px;
  display: ${(props) => (props.$visibility ? 'none' : 'block')};
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonText = styled.span`
padding: 0 10px 0 10px;
font-weight: 600;
color: ${(props) => (props.reverse ? Colors.GREY : Colors.WHITE)};
/* &:hover {
  color: ${(props) => (props.reverse ? Colors.BLACK : 'inherit')};
} */
`;

export const ButtonContainer = styled.div`
padding-right: 40px;
display: flex;
gap: 20px;
align-items: center;
`;

export const Link = styled(RouterLink)`
text-decoration: none;
color: ${Colors.WHITE};

  &:visited {
  color: ${Colors.WHITE};
}
`;
