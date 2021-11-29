import React, {
  useContext, useState, useEffect, useMemo, useRef,
} from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import { FixedSizeList as List } from 'react-window';
import { useParams } from 'react-router-dom';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';

import DeleteIcon from '@material-ui/icons/Delete';
import InputIcon from '@material-ui/icons/Input';
import CloseIcon from '@material-ui/icons/Close';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';
import { removeMultiJiraLocalStorage } from 'utils/removeMultiLocalStorage.utils';
import { LocalStorageKey } from 'constants/localStorage';

import TooltipMaterial from 'components/Shared/TooltipMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import CustomScrollbarsVirtualList from 'components/Shared/CustomScrollbarsVirtualList';
import CardIssue from 'components/CardIssue';
import ImportJiraModal from 'components/ImportJiraModal';
import WelcomeJiraModal from 'components/ImportJiraModal/WelcomeJiraModal';
import AddIssueForm from 'components/CardSidebar/AddIssueForm';
import { showRightSideBar } from 'screens/Game/Game';

import * as Styled from './CardSidebar.styled';

// eslint-disable-next-line sonarjs/cognitive-complexity
function CardSidebar() {
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);

  const value = useContext(showRightSideBar);

  const [inputNewIssue, setInputNewIssue] = useState(false);
  const [openVotingPopper, setOpenVotingPopper] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showJiraModal, setShowJiraModal] = useState();
  const [showWelcomeJiraModal, setShowWelcomeJiraModal] = useState(false);
  const [projectListJira, setProjectListJira] = useState(null);
  const [issueListFromJira, setIssueListFromJira] = useState(null);
  const [issueName, setIssueName] = useState('');

  const listRef = useRef();
  const outerRef = useRef();

  const styleProps = { theme: 'transparent' };
  const classes = Styled.SidebarButtonStyles(styleProps);
  const classCancel = Styled.SidebarButtonStyles({ cancel: 'cancel', theme: 'transparent' });
  const defaultIssue = Styled.AddNewIssueStyle();

  const { linkTeam } = useParams();
  const teamId = linkTeam.slice(linkTeam.lastIndexOf('-') + 1);

  const removeAllIssue = async () => {
    if (gameState.isHost) {
      if (!gameState.isCountingDown && !gameState.gameFinish && !gameState.currentIssue) {
        const result = await Swal.fire({
          title: '<strong>Delete</strong>',
          html: '<b>Do you want to remove all issues ?</b>',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: 'red',
          reverseButtons: true,
          focusConfirm: false,
        });
        if (result.isConfirmed) {
          try {
            await teamService.removeAllCardIssue(teamId);
          } catch (err) {
            Alert.error(getErrorMessage(err));
          }
        }
      } else {
        Swal.fire({
          text: "You can't delete while voting",
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!',
        });
      }
    }
  };

  const importIssue = async (listProject) => {
    try {
      setShowJiraModal(true);
      if (!localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID)) return;
      setLoading(true);
      const issueListRes = await teamService.getListCardIssueFromJira({
        project: listProject,
        jiraToken: localStorage.getItem(LocalStorageKey.JIRA_TOKEN),
        jiraCloudId: localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID),
        url: localStorage.getItem(LocalStorageKey.JIRA_URL),
      });
      // add props selected to use method produce from immer package
      issueListRes.listIssue.forEach((issue) => {
        issue.selected = false;
      });
      setIssueListFromJira(issueListRes);
      setLoading(false);
    } catch (err) {
      Alert.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  const getAllProject = async () => {
    // check this token is expire - > 3500 * 1000 milliseconds
    if (new Date().getTime() - parseInt(localStorage.getItem(LocalStorageKey.JIRA_CREATE)) > 3500 * 1000) {
      removeMultiJiraLocalStorage();
    }
    if (!localStorage.getItem(LocalStorageKey.JIRA_CREATE)) {
      setShowWelcomeJiraModal(true);
    } else {
      try {
        setShowJiraModal(true);
        // check this LocalStorageKey.JIRA_CLOUD_ID and LocalStorageKey.JIRA_TOKEN is exist
        if (
          !(localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID) &&
            localStorage.getItem(LocalStorageKey.JIRA_TOKEN)
          )
        ) return;
        setLoading(true);
        const projectListRes = await teamService.getListProjectFromJira({
          jiraCloudId: localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID),
          jiraToken: localStorage.getItem(LocalStorageKey.JIRA_TOKEN),
        });
        // add props selected to use method produce from immer package
        projectListRes.forEach((project) => {
          project.selected = false;
        });
        setProjectListJira(projectListRes);
        setLoading(false);
      } catch (err) {
        Alert.error(getErrorMessage(err));
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const getCardIssue = async () => {
      try {
        const allCardIssueByTeam = await teamService.getAllCardIssueByTeamId(teamId);
        const cardIssues = allCardIssueByTeam.map((card) => ({
          issue: card.issue,
          voteScore: card.voteScore,
          cardId: card._id,
          link: card.link,
          description: card.description,
          createAt: card.createAt,
        }));
        setGameState({ cardIssue: cardIssues });
      } catch (err) {
        Alert.error(getErrorMessage(err));
      }
    };
    getCardIssue();
  }, [teamId, setGameState]);

  useEffect(() => {
    if (gameState.currentIssue) {
      const returnValueCard = gameState.cardIssue.find((element) => element.cardId === gameState.currentIssue);
      if (returnValueCard) {
        setIssueName(returnValueCard.issue);
      } else {
        setIssueName('');
      }
    } else {
      setIssueName('');
    }
  }, [gameState.currentIssue, gameState.cardIssue]);

  useEffect(() => {
    if (gameState.currentIssue && !value.show) {
      setOpenVotingPopper(true);
    } else {
      setOpenVotingPopper(false);
    }
  }, [gameState.currentIssue, value.show]);

  const addNewIssue = async (e) => {
    e.preventDefault();
    if (gameState.isHost) {
      if (issueTitle) {
        try {
          await teamService.createCardIssue({
            issue: issueTitle,
            teamId,
            voteScore: -1,
            link: '',
            description: '',
          });
        } catch (err) {
          Alert();
        }
        setIssueTitle('');
      }
      setInputNewIssue(!inputNewIssue);
    }
  };

  const addAnotherIssue = () => {
    if (gameState.isHost && !gameState.gameFinish && !gameState.isCountingDown) {
      setInputNewIssue(!inputNewIssue);
    }
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    setIssueTitle(e.target.value);
  };

  const cardIssueListHeight = useMemo(() => (
    gameState.cardIssue.length > 3 ? 510 : gameState.cardIssue.length * 150
  ), [gameState.cardIssue]);

  const getCardIssueKey = (idx, data) => {
    const { cardId } = data[idx].props.issueData;
    return cardId;
  };

  return (
    <>
      {
        value.show &&
        <Styled.SideBarWrapper
          $show={value.show}
        >
          <Styled.SidebarHeader>
            <Styled.Title>Issues</Styled.Title>
            <WelcomeJiraModal
              open={showWelcomeJiraModal}
              handleClose={() => setShowWelcomeJiraModal(false)}
              setShowJiraModal={setShowJiraModal}
            />
            <ImportJiraModal
              importIssue={importIssue}
              projectListJira={projectListJira}
              setProjectListJira={setProjectListJira}
              setLoading={setLoading}
              loading={loading}
              open={showJiraModal}
              setShowJiraModal={setShowJiraModal}
              handleClose={() => setShowJiraModal(false)}
              issueListFromJira={issueListFromJira}
              setIssueListFromJira={setIssueListFromJira}
              setShowWelcomeJiraModal={setShowWelcomeJiraModal}
            />
            {
              gameState.isHost &&
              <>
                <Styled.Divider />
                <TooltipMaterial
                  title="Import issues from Jira"
                  placement="bottom"
                >
                  <ButtonMaterial
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    onClick={getAllProject}
                  ><InputIcon />
                  </ButtonMaterial>
                </TooltipMaterial>
              </>
            }
            <TooltipMaterial
              title="Delete all current issues"
              placement="bottom"
            >
              <ButtonMaterial
                onClick={removeAllIssue}
                classes={{
                  root: classes.root,
                  label: classes.label,
                }}
                disabled={!gameState.isHost}
              >
                <DeleteIcon />
              </ButtonMaterial>
            </TooltipMaterial>
            <ButtonMaterial
              onClick={() => { value.setRightSideBar(!value.show); }}
              classes={{
                root: classCancel.root,
                label: classCancel.label,
              }}
            ><CloseIcon />
            </ButtonMaterial>
          </Styled.SidebarHeader>
          <List
            autoHeight
            height={cardIssueListHeight}
            itemData={
              gameState.cardIssue.map((issue) => (
                <CardIssue
                  issueData={issue}
                  gameState={gameState}
                />
              ))
            }
            itemKey={getCardIssueKey}
            itemCount={gameState.cardIssue.length}
            itemSize={150}
            width={270}
            initialScrollOffset={0}
            ref={listRef}
            outerElementType={CustomScrollbarsVirtualList}
            outerRef={outerRef}
          >
            {({ style, data, index }) => <div style={style}>{data[index]}</div>}
          </List>
          {
            inputNewIssue ?
              <AddIssueForm
                issueTitle={issueTitle}
                inputNewIssue={inputNewIssue}
                setIssueTitle={setIssueTitle}
                addNewIssue={addNewIssue}
                handleChangeInput={handleChangeInput}
                setInputNewIssue={setInputNewIssue}
              />
              :
              <ButtonMaterial
                classes={{
                  root: defaultIssue.root,
                  label: defaultIssue.label,
                }}
                disabled={!gameState.isHost}
                onClick={addAnotherIssue}
              >+Add another issue
              </ButtonMaterial>
          }
          <TooltipMaterial
            title={issueName}
            placement="left"
          >
            <div style={{ position: 'fixed', width: '100%', top: '83%' }}>
              {value.show && issueName && <Styled.DividerVoting />}
              <Styled.IssueCurrentName
                $open={!!issueName}
              >
                Voting: {issueName}
              </Styled.IssueCurrentName>
            </div>
          </TooltipMaterial>
        </Styled.SideBarWrapper>
      }
      <TooltipMaterial
        title={issueName}
        placement="right"
      >
        <Styled.OpenCardPopper
          $open={openVotingPopper && !!issueName}
          onClick={() => { value.setRightSideBar(!value.show); }}
        >
          Voting: {issueName}
        </Styled.OpenCardPopper>
      </TooltipMaterial>
    </>

  );
}

export default CardSidebar;
