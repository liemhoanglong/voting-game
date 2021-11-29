import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { RouteUrl } from 'constants/router';

import { Toast as ToastData } from 'recoils/toast/atom';

import Girl from 'assets/svgs/girl.svg';
import Robot from 'assets/svgs/robot.svg';
import Boy from 'assets/svgs/boy.svg';
import StaticImg from 'assets/images/static-img.jpg';
import Video from 'assets/videos/video.mp4';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from 'components/Header';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import Toast from 'components/Shared/Toast';
import UpgradePlanningDialog from 'components/UpgradePlanningModal';
import * as Styled from './Home.styled';

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = Styled.ButtonNewGameStyles();
  const [toast, setToast] = useRecoilState(ToastData);
  const [showPopupUpgradePlanning, setShowPopupUpgradePlanning] = useState(false);

  return (
    <>
      <Styled.HomeWrapper>
        <UpgradePlanningDialog
          open={showPopupUpgradePlanning}
          handleClose={() => setShowPopupUpgradePlanning(false)}
        />
        <Header setShowPopupUpgradePlanning={setShowPopupUpgradePlanning} />
        <Styled.Container>
          <Styled.Main>
            <Styled.MainLeft>
              <Styled.Title>Scrum poker made simple and fun.</Styled.Title>
              <Styled.Content>The best poker pointing app for agile development teams.</Styled.Content>
              <Styled.Button>
                <ButtonMaterial
                  classes={matches && {
                    root: classes.root,
                    label: classes.label,
                  }}
                  fullWidth
                  theme="secondary"
                >
                  <Styled.Link
                    to={{
                      pathname: RouteUrl.CREATE_TEAM,
                    }}
                  >
                    Start new game
                  </Styled.Link>
                </ButtonMaterial>
              </Styled.Button>
            </Styled.MainLeft>
            <Styled.MainRight>
              <Styled.ImageContainer>
                <Styled.BoyImage src={Boy} />
                <Styled.GirlImage src={Girl} />
                <Styled.RobotImage src={Robot} />
              </Styled.ImageContainer>
              <Styled.VideoContainer>
                <Styled.Video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={StaticImg}
                >
                  <source src={Video} />
                </Styled.Video>
              </Styled.VideoContainer>
            </Styled.MainRight>
          </Styled.Main>
          <Styled.Footer>
            <ButtonMaterial theme="transparent">Contact us</ButtonMaterial>
            <ButtonMaterial theme="transparent" onClick={() => setShowPopupUpgradePlanning(true)}>Go premium</ButtonMaterial>
            <ButtonMaterial theme="transparent">Terms and conditions</ButtonMaterial>
          </Styled.Footer>
        </Styled.Container>
        {toast.open && (
          <Toast
            open={toast.open}
            type={toast.type}
            message={toast.message}
            closeToast={() => setToast({ type: 'info', open: false, message: '' })}
          />
        )}
      </Styled.HomeWrapper>
    </>
  );
}

export default Home;
