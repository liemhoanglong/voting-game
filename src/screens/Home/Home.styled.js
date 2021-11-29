import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Colors } from 'constants/styles';

import Background from 'assets/svgs/background.svg';
import { makeStyles } from '@material-ui/core/styles';

export const HomeWrapper = styled.div`
  background-color: ${Colors.DODGER_BLUE};
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  overflow: hidden;
  background-image: url(${Background});
  background-size: cover;
`;

export const Container = styled.div`
  padding: 0 24px;
  max-width: 1236px;
  margin: 0 auto;
  height: 100%;
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.WHITE};
  font-size: 18px;
  min-height: calc(100vh - 80px - 43px - 20px);
  height: 100%;

  @media (max-width: 992px) {
    min-height: 40vh;
    flex-direction: column;
  }
`;

export const MainLeft = styled.div`
  text-align: left;
  margin-right: 90px;

  @media (max-width: 992px) {
    margin-bottom: 15%;
    margin-top: 10%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 0;
  }
`;

export const Title = styled.h2`
  font-size: 42px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
     font-size: 35px;
  }
`;

export const Content = styled.p`
  margin-bottom: 40px;

  @media (max-width: 992px) {
    font-size: 20px;
    opacity: 0.7;
  }
`;

export const Button = styled.div`
  max-width: 360px;
  margin-bottom: 24px;
`;

export const MainRight = styled.div`
  margin: auto;
  width: 630px;
  flex-shrink: 0;
  max-width: 100%;
  padding-top: 80px;
  position: relative;
`;

export const ImageContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 3;
`;

export const BoyImage = styled.img`
  width: 170px;
  right: -80px;
  bottom: -124px;
  position: absolute;
  -webkit-mask-image: linear-gradient(180deg,${Colors.BLACK} 80%,transparent);

  @media (max-width: 992px) {
    width: 132px;
    right: -50px;
    bottom: -124px;
    position: absolute;
  }

  @media (max-width: 675px) {
    width: 18%;
    right: -13px;
  }
`;

export const GirlImage = styled.img`
  width: 170px;
  left: -80px;
  bottom: -124px;
  position: absolute;
  -webkit-mask-image: linear-gradient(180deg,${Colors.BLACK} 80%,transparent);

  @media (max-width: 992px) {
    width: 135px;
    margin-left: 25px;
  }

  @media (max-width: 675px) {
    width: 19%;
    margin-left: 65px;
  }

`;

export const RobotImage = styled.img`
  width: 170px;
  bottom: 385px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;

  @media (max-width: 675px) {
    border-radius: 10px;
    width: 20%;
    margin-bottom: -35px;;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

export const Video = styled.video`
  width: 630px;

  @media (max-width: 675px) {
    width: 550px;
    border-radius: 10px;
  }
`;

export const Footer = styled.div`
  text-align: left;
  margin-bottom: 20px;

  @media (max-width: 992px) {
    text-align: center;
  }
`;

export const Link = styled(RouterLink)`
  width: 100%;
  height: 100%;
  color: ${Colors.DODGER_BLUE};
  text-decoration: none;
`;

export const ButtonNewGameStyles = makeStyles({
  root: {
    width: '560px',
    height: '58px',
    borderRadius: '8px',
  },

  label: {
    fontWeight: 600,
  },
});
