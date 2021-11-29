import React, { useContext, useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import { FixedSizeList as List } from 'react-window';
import { useHistory } from 'react-router-dom';
import QueryString from 'query-string';
import { Scrollbars } from 'react-custom-scrollbars';
// import env from 'constants/environment';

import { teamService, userService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { setNewGameState } from 'recoils/gameState/selector';

import DeleteIcon from '@material-ui/icons/Delete';
import InputIcon from '@material-ui/icons/Input';
import CloseIcon from '@material-ui/icons/Close';

import { getErrorMessage } from 'utils/messageError.utils';
import * as Alert from 'utils/alert.util';
import { LocalStorageKey } from 'constants/localStorage';

import TooltipMaterial from 'components/Shared/TooltipMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import CardIssue from 'components/CardIssue';
import { showRightSideBar } from 'screens/Game/Game';
import * as Styled from './CardSidebar.styled';
import ImportJiraModal from '../ImportFromJiraModal';
import CustomScrollbarsVirtualList from '../Shared/CustomScrollbarsVirtualList';

const listRef = React.createRef();
const outerRef = React.createRef();

// eslint-disable-next-line sonarjs/cognitive-complexity
function CardSidebar() {
  const history = useHistory();
  const styleProps = { theme: 'transparent' };
  const value = useContext(showRightSideBar);
  const [inputNewIssue, setInputNewIssue] = useState(false);
  const [openVotingPopper, setOpenVotingPopper] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopupImportFromJira, setShowPopupImportFromJira] = useState(false);
  const [projectListJira, setProjectListJira] = useState(null);
  const [issueListFromJira, setIssueListFromJira] = useState(null);
  const gameState = useRecoilValue(GameState);
  const setGameState = useSetRecoilState(setNewGameState);
  const [issueName, setIssueName] = useState('');
  const [checkTokenJira, setCheckTokenJira] = useState(localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID));

  const classes = Styled.SidebarButtonStyles(styleProps);
  const classCancel = Styled.SidebarButtonStyles({ cancel: 'cancel', theme: 'transparent' });
  const saveIssueButtonClasses = Styled.ConfirmIssueStyle({ value: 'save' });
  const defaultIssue = Styled.AddNewIssueStyle();
  const cancelIssue = Styled.ConfirmIssueStyle();
  const crrUrl = window.location.href;
  const teamId = crrUrl.split('-')[crrUrl.split('-').length - 1];

  useEffect(() => {
    const getJiraCloudId = async () => {
      if (localStorage.getItem(LocalStorageKey.JIRA) === 'setup') {
        localStorage.removeItem(LocalStorageKey.JIRA);
        const { code, state } = QueryString.parse(history.location.search);
        if (!code) return;
        const jiraAccess = await getCloudIdJira(code);
        localStorage.setItem(LocalStorageKey.JIRA_CLOUD_ID, jiraAccess.jiraCloudId);
        localStorage.setItem(LocalStorageKey.JIRA_TOKEN, jiraAccess.jiraToken);
        localStorage.setItem(LocalStorageKey.JIRA_URL, jiraAccess.jiraUrl);
        localStorage.setItem(LocalStorageKey.JIRA_CREATE, new Date().getTime());
        history.push(state.slice(11));
        const userId = await userService.getUserId();
        // ! set change host
        await teamService.changeHostWhenJiraCallback({ teamId, userId });
        localStorage.removeItem(LocalStorageKey.CHANGE_HOST);
      }
    };
    getJiraCloudId();
  }, []);

  const getCloudIdJira = async (code) => {
    try {
      return await teamService.getCloudIdJira(code);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllIssue = async () => {
    if (gameState.isHost) {
      if (!gameState.isCountingDown && !gameState.gameFinish && !gameState.currentIssue) {
        const result = await Swal.fire({
          title: '<strong>Delete</strong>',
          html:
            '<b>Do you want to remove all issues</b>' +
            '?',
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
      setShowPopupImportFromJira(true);
      if (!localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID)) return;
      setLoading(true);
      const res = await teamService.getListCardIssueFromJira({
        project: listProject,
        jiraToken: localStorage.getItem(LocalStorageKey.JIRA_TOKEN),
        jiraCloudId: localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID),
        url: localStorage.getItem(LocalStorageKey.JIRA_URL),
      });
      setIssueListFromJira(res);
      setLoading(false);
    } catch (err) {
      Alert.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  const getAllProject = async () => {
    try {
      setShowPopupImportFromJira(true);
      if (new Date().getTime() - parseInt(localStorage.getItem(LocalStorageKey.JIRA_CREATE)) > 3500 * 1000) {
        localStorage.removeItem(LocalStorageKey.JIRA_CLOUD_ID);
        localStorage.removeItem(LocalStorageKey.JIRA_TOKEN);
        localStorage.removeItem(LocalStorageKey.JIRA_URL);
        localStorage.removeItem(LocalStorageKey.JIRA_CREATE);
        setCheckTokenJira(null);
      }
      if (!localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID) || !localStorage.getItem(LocalStorageKey.JIRA_TOKEN)) return;
      setLoading(true);
      const res = await teamService.getListProjectFromJira({
        jiraCloudId: localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID),
        jiraToken: localStorage.getItem(LocalStorageKey.JIRA_TOKEN),
      });
      setProjectListJira(res);
      setLoading(false);
    } catch (err) {
      Alert.error(getErrorMessage(err));
      setLoading(false);
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

  const stylesConfirm = {
    justifyContent: 'space-between',
  };

  const renderCard = ({ index, style }) => (
    <div style={style}>
      <CardIssue
        selected={gameState.currentIssue === gameState.cardIssue[index].cardId}
        style={style}
        index={index}
      > test
      </CardIssue>
    </div>
  );

  return (
    <>
      {
        value.show &&
        <Styled.SideBarWrapper
          $show={value.show}
        >
          <Styled.SidebarHeader style={stylesConfirm}>
            <Styled.Title>Issues</Styled.Title>
            <ImportJiraModal
              importIssue={importIssue}
              projectListJira={projectListJira}
              checkTokenJira={checkTokenJira}
              setCheckTokenJira={setCheckTokenJira}
              setLoading={setLoading}
              loading={loading}
              open={showPopupImportFromJira}
              handleClose={() => setShowPopupImportFromJira(false)}
              issueListFromJira={issueListFromJira}
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
          <Scrollbars
            autoHide
            hideTracksWhenNotNeeded
            style={{ height: gameState.cardIssue.length > 3 ? 510 : gameState.cardIssue.length * 150, width: 270 }}
          >
            <List
              ref={listRef}
              height={gameState.cardIssue.length > 3 ? 510 : gameState.cardIssue.length * 150}
              itemData={gameState.cardIssue}
              itemCount={gameState.cardIssue.length}
              itemSize={150}
              width={270}
              initialScrollOffset={0}
              outerElementType={CustomScrollbarsVirtualList}
              outerRef={outerRef}
            >
              {renderCard}
            </List>
          </Scrollbars>
          {
            inputNewIssue ?
              <form onSubmit={addNewIssue}>
                <br />
                <InputMaterial
                  label="New Issue Title"
                  type="text"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  autoComplete="off"
                  value={issueTitle}
                  onChange={handleChangeInput}
                />
                <Styled.SidebarHeader style={stylesConfirm}>
                  <ButtonMaterial
                    classes={{
                      root: cancelIssue.root,
                      label: defaultIssue.label,
                    }}
                    onClick={() => { setInputNewIssue(!inputNewIssue); setIssueTitle(''); }}
                  >Cancel
                  </ButtonMaterial>
                  <ButtonMaterial
                    classes={{
                      root: saveIssueButtonClasses.root,
                      label: saveIssueButtonClasses.label,
                    }}
                    type="submit"
                  >Save
                  </ButtonMaterial>
                </Styled.SidebarHeader>
              </form>
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
