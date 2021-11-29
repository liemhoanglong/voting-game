import styled, { css } from 'styled-components';
import { Colors } from 'constants/styles';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export const TableCardWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  perspective: 10rem;
  perspective-origin: bottom;
  max-width: 100%;
  padding-top: ${(props) => (props.crown === true ? '0px' : '30px')};
  ${(props) => props.row && css`&:not(:first-child) {
    margin-left: 40px;
  }`}
  ${(props) => props.column && css`&:not(:last-child) {
    margin-top: 30px;
  }`}
`;
export const MoreMemberTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
    whiteSpace: 'pre',
    marginTop: '0px',
  },
})(Tooltip);
export const PingTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);

export const TableCardHost = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableCardContainer = styled.div`
  ${(props) => props.spectator === true &&
    css`
    background: ${Colors.WHITE_GREY};
    border: 2px dashed ${Colors.GRAY_CHATEAU};
    display: flex;
    justify-content: center;
    align-items: center;
  `}
  ${(props) => props.empty &&
    css`
    background-color: ${Colors.PORCELAIN};
    ${(props) => props.host &&
        css`
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      &:hover:after {
        content: "📢";
      }
    `}
  `}
    
  width: 40px;
  height: 70px;
  border-radius: 10px;
  display:flex;
  flex-direction:column;
`;

export const VisibilityIcon = styled(VisibilitySharpIcon)`
  font-size: 16px;
  color: ${Colors.GRAY_CHATEAU};
`;

export const TextPlayerName = styled.div`
  width:100px;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2em;
  height: 2.4em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TableCardDownwardContainer = styled.div`
  transform: ${(props) => props.downward && 'rotateY(180deg)'};
  display: flex;
  align-items: center;
  justify-content: center;

  transform-style: preserve-3d;
  position:relative;
  transition: all .6s;
  cursor: default;
  border: 0;
  outline:0;
  background: transparent;
`;

export const CardValueSideWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all .3s;
  backface-visibility: hidden;
`;

export const CardValueSide = styled.div`
  width: 36px;
  height: 66px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  overflow: hidden;
  color: ${Colors.GREY};
  font-weight: 700;
  backface-visibility: hidden;
  border: 2px solid ${Colors.GREY};
`;

export const CardPictureSideWrapper = styled.div`
  transform: rotateY(180deg);

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all .3s;
  backface-visibility: hidden;
`;

export const CrownImage = styled.img`
  height:30px;
  width:30px;
`;

export const CardPictureSide = styled.div`
  width: 40px;
  height: 70px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  overflow: hidden;


  background: linear-gradient(45deg,${Colors.GREY} 12%,transparent 0,transparent 88%,${Colors.GREY} 0),
  linear-gradient(135deg,transparent 37%,${Colors.BLUE_GREY} 0,${Colors.BLUE_GREY} 63%,transparent 0),
  linear-gradient(45deg,transparent 37%,${Colors.GREY} 0,${Colors.GREY} 63%,transparent 0),${Colors.CLOUDY_BLUE};
  background-size: 17px 17px;
  border: 1px solid rgba(168,174,178,.4);
  box-shadow: 0 2px 4px rgb(168 174 178 / 40%);
`;
