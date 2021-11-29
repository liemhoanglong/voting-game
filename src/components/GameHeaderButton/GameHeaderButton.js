import React, {
  useState, lazy, useContext, Suspense,
} from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import * as Role from 'constants/role.constant';

import { GameState } from 'recoils/gameState/atom';

import Modal from '@material-ui/core/Modal';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';

import TooltipMaterial from 'components/Shared/TooltipMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import { showRightSideBar } from 'screens/Game/Game';
import * as Styled from './GameHeaderButton.styled';

const InviteMember = lazy(() => import(/* webpackPrefetch: true */'components/InviteMember'));

function GameButton() {
  const { linkTeam } = useParams();
  const [inviteModal, setInviteModal] = useState(false);
  const gameState = useRecoilValue(GameState);
  const value = useContext(showRightSideBar);
  const styleProps = { theme: 'transparent' };
  const classes = Styled.HeaderButtonStyles(styleProps);
  const issueButton = Styled.HeaderButtonStyles({ ...styleProps, issue: true });
  let teamId = '';
  if (linkTeam) {
    const linkSplit = linkTeam.split('-');
    teamId = linkSplit[linkSplit.length - 1];
  }

  const handleInviteMember = () => {
    if (gameState.role === Role.ADMIN || gameState.role === Role.MEMBER) {
      setInviteModal(true);
    }
  };

  const handleShowCardSideBar = () => {
    value.setRightSideBar((prevState) => !prevState);
  };

  return (
    <>
      <ButtonMaterial
        onClick={handleInviteMember}
        classes={{
          root: classes.root,
          label: classes.label,
        }}
      >
        Invite
      </ButtonMaterial>
      <TooltipMaterial
        title="Issues"
        placement="bottom"
      >
        <ButtonMaterial
          classes={{
            root: issueButton.root,
            label: issueButton.label,
          }}
          onClick={handleShowCardSideBar}
        >
          <LibraryBooksRoundedIcon />
        </ButtonMaterial>
      </TooltipMaterial>
      <Styled.Divider />
      {teamId && inviteModal &&
        <Modal open={inviteModal}>
          <Suspense>
            <InviteMember
              closeModal={() => setInviteModal(false)}
              teamId={teamId}
            />
          </Suspense>
        </Modal>}
    </>
  );
}

export default GameButton;
