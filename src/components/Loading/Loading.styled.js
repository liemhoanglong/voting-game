import styled, { css, keyframes } from 'styled-components';
import { Colors } from 'constants/styles';
import Loading_1 from 'assets/svgs/loading_1.svg';
import Loading_2 from 'assets/svgs/loading_2.svg';
import Loading_3 from 'assets/svgs/loading_3.svg';
import Loading_4 from 'assets/svgs/loading_4.svg';
import Loading_5 from 'assets/svgs/loading_5.svg';

export const LoadingWrapper = styled.div`
  padding-top: 120px;
  ${(props) => (props.fullScreen && css`
    padding-top: 0;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `)}
`;

export const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RobotContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 175px;
`;

const BackgroundChange = keyframes`
  0%, 100% {
    background-image: url(${Loading_1});
    box-shadow: 0 0 0 4px ${Colors.LIGHT_WHITE_BLUE}, 0 0 0 5px rgb(215 233 255 / 10%);
  }

  20% {
    background-image: url(${Loading_2});
    box-shadow: 0 0 0 2px ${Colors.LIGHT_WHITE_BLUE};
  }

  40% {
    background-image: url(${Loading_3});
    box-shadow: 0 0 0 10px ${Colors.LIGHT_WHITE_BLUE}, 0 0 0 50px rgb(215 233 255 / 40%);
  }

  60% {
    background-image: url(${Loading_4});
    box-shadow: 0 0 0 8px ${Colors.LIGHT_WHITE_BLUE}, 0 0 0 35px rgb(215 233 255 / 30%);
  }

  80% {
    background-image: url(${Loading_5});
    box-shadow: 0 0 0 6px ${Colors.LIGHT_WHITE_BLUE}, 0 0 0 20px rgb(215 233 255 / 20%);
  }
`;

export const Robot = styled.div`
  animation: ${BackgroundChange} 1s infinite;
  transition: all 0;
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  border-radius: 100%;
  background-position: 50% 50%;
  background-color: ${Colors.LIGHT_WHITE_BLUE};
`;
