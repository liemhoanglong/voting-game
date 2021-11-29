import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Slide, Button, Grid,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { teamService } from 'services';
import { randomId } from 'utils/randomId.utils';
import Environment from 'constants/environment';
import { LocalStorageKey } from 'constants/localStorage';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import CheckboxMaterial from 'components/Shared/CheckboxMaterial';
import Loading from 'components/Loading';
import robotCable from 'assets/svgs/robot-cable.svg';
import arrowCurved from 'assets/svgs/arrow-curved.svg';
import projectListJira from './projectListJira';
import IssueListJira from './IssueListJira';
import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  issueListFromJira: PropTypes.object,
  projectListJira: PropTypes.array,
  handleClose: PropTypes.func,
  setLoading: PropTypes.func,
  importIssue: PropTypes.func,
  setCheckTokenJira: PropTypes.func,
  checkTokenJira: PropTypes.string,
};

const defaultProps = {
  open: false,
  loading: false,
  issueListFromJira: null,
  projectListJira: null,
  handleClose: () => { },
  setLoading: () => { },
  importIssue: () => { },
  setCheckTokenJira: () => { },
  checkTokenJira: null,
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function ImportJiraModal(props) {
  const history = useHistory();
  const roomId = history.location.pathname.split('-')[history.location.pathname.split('-').length - 1];
  const [projectChoices, setProjectChoices] = useState([]);
  const [issueChoices, setIssueChoices] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const handleClickIssue = (idx) => {
    let temp = [...issueChoices];
    const duplicateIssueIdx = temp.findIndex((issue) => issue.link === props.issueListFromJira.listIssue[idx].link);
    if (duplicateIssueIdx > -1) {
      temp.splice(duplicateIssueIdx, 1);
      setIssueChoices(temp);
    } else {
      temp = [...temp, props.issueListFromJira.listIssue[idx]];
      setIssueChoices(temp);
    }
  };

  const handleClickProject = (idx) => {
    let temp = [...projectChoices];
    const duplicateProjectIdx = temp.findIndex((project) => project === idx);
    if (duplicateProjectIdx > -1) {
      temp.splice(duplicateProjectIdx, 1);
      setProjectChoices(temp);
    } else {
      temp = [...temp, idx];
      setProjectChoices(temp);
    }
  };

  const handleImport = async () => {
    try {
      props.setLoading(true);
      await teamService.importListCardIssue({ teamId: roomId, issues: issueChoices });
      setProjectChoices([]);
      setIssueChoices([]);
      setCheckAll(false);
      props.setLoading(false);
      props.handleClose();
    } catch (err) {
      props.setLoading(false);
    }
  };

  const handleAccessJira = () => {
    localStorage.setItem(LocalStorageKey.JIRA, 'setup');
    window.location.href = [
      'https://auth.atlassian.com/authorize?',
      'audience=api.atlassian.com&',
      `client_id=${Environment.JIRA_API_ID}&`,
      'scope=read%3Ajira-user%20read%3Ajira-work%20write%3Ajira-work&',
      `redirect_uri=${Environment.REDIRECT_URI}&`,
      `state=${randomId()}-${history.location.pathname.slice(1)}&`,
      'response_type=code&',
      'prompt=consent',
    ].join('');
  };

  const handleSearchIssue = async () => {
    if (new Date().getTime() - parseInt(localStorage.getItem(LocalStorageKey.JIRA_CREATE)) > 3500 * 1000) {
      localStorage.removeItem(LocalStorageKey.JIRA_CLOUD_ID);
      localStorage.removeItem(LocalStorageKey.JIRA_TOKEN);
      localStorage.removeItem(LocalStorageKey.JIRA_URL);
      localStorage.removeItem(LocalStorageKey.JIRA_CREATE);
      props.setCheckTokenJira(null);
    }
    if (projectChoices.length === 0) return;
    try {
      props.setLoading(true);
      await props.importIssue(projectChoices.join());
      props.setLoading(false);
    } catch (err) {
      props.setLoading(false);
    }
  };

  const handleClose = () => {
    setProjectChoices([]);
    setIssueChoices([]);
    setCheckAll(false);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="Pop-up-import-issue-from-jira"
      maxWidth={props.checkTokenJira ? 'md' : 'xs'}
      fullWidth
      scroll="paper"
      PaperProps={{
        style: { borderRadius: '1.6rem' },
      }}
    >
      {
        props.loading ?
          <>
            <Loading />
            <center style={{ marginTop: 175, marginBottom: 100 }}>Getting issues from JIRA...</center>
          </>
          :
          <>
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
              Import from JIRA
              {
                props.handleClose ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : null
              }
            </DialogTitle>
            <DialogContent>
              {
                props.checkTokenJira ?
                  <Grid container spacing={2}>
                    <Styled.CustomGrid item lg={3} md={4} sm={12} style={{ borderRight: '2px solid #e8e9ea' }}>
                      <div>
                        <Styled.IssueText style={{ fontWeight: 500, margin: '10px 0 1rem 10px', fontSize: 20 }}>Project</Styled.IssueText>
                        {
                          props.projectListJira &&
                          <List
                            autoHeight
                            height={Math.min(600, 50 * props.projectListJira.length)}
                            itemData={{ projectListJira: props.projectListJira, projectChoices, handleClickProject }}
                            itemCount={props.projectListJira.length}
                            itemSize={50}
                            initialScrollOffset={0}
                          >
                            {projectListJira}
                          </List>
                        }
                      </div>
                      <ButtonMaterial
                        onClick={handleSearchIssue}
                        fullWidth
                        style={{ marginTop: '1rem', borderRadius: 10 }}
                      >
                        Search issues
                      </ButtonMaterial>
                    </Styled.CustomGrid>
                    <Styled.CustomGrid item lg={9} md={8} sm={12}>
                      {
                        props.issueListFromJira && props.issueListFromJira.listIssue ?
                          <Styled.SelectAllIssues
                            onClick={() => {
                              setCheckAll(issueChoices.length < props.issueListFromJira.listIssue.length || false);
                              setIssueChoices(issueChoices.length === props.issueListFromJira.listIssue.length ? [] : [...props.issueListFromJira.listIssue]);
                            }}
                          >
                            <CheckboxMaterial checked={checkAll} />
                            <span>Select all issues</span>
                          </Styled.SelectAllIssues>
                          :
                          <>
                            <img src={arrowCurved} alt="arrow-curved" width={200} style={{ marginTop: '4rem' }} />
                            <center>
                              <p style={{ color: '#a8aeb2', margin: '1rem 0 3rem 0', fontSize: 20 }}>Please, search issues on the left</p>
                            </center>
                          </>
                      }
                      {
                        props.issueListFromJira && props.issueListFromJira.listIssue &&
                        <List
                          autoHeight
                          height={Math.min(600, 60 * props.issueListFromJira.listIssue.length)}
                          itemData={{ listIssue: props.issueListFromJira.listIssue, handleClickIssue, issueChoices }}
                          itemCount={props.issueListFromJira.listIssue.length}
                          itemSize={60}
                          initialScrollOffset={0}
                        >
                          {IssueListJira}
                        </List>
                      }
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            onClick={() => {
                              localStorage.removeItem('jira-cloud-id');
                              localStorage.removeItem('jira-token');
                              localStorage.removeItem('change-host');
                              localStorage.removeItem('jira-url');
                              props.setCheckTokenJira(null);
                            }}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            style={{ marginTop: '1rem', borderRadius: 10 }}
                          >
                            Erease credentials
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          {
                            props.issueListFromJira && props.issueListFromJira.listIssue &&
                            <ButtonMaterial onClick={handleImport} fullWidth style={{ marginTop: '1rem', borderRadius: 10 }}>
                              Import {issueChoices.length ? issueChoices.length : ''} issues
                            </ButtonMaterial>
                          }
                        </Grid>
                      </Grid>
                    </Styled.CustomGrid>
                  </Grid>
                  :
                  <>
                    <center>
                      <img src={robotCable} alt="robot-cable" />
                      <Styled.IssueText style={{ fontWeight: 500, fontSize: 28, marginTop: '2rem' }}>Welcome to JIRA import !</Styled.IssueText>
                      <Styled.IssueText style={{ color: '#a8aeb2', marginTop: '1rem' }}>
                        You need to allow us access to your Atlassian account.
                      </Styled.IssueText>
                    </center>
                    <ButtonMaterial onClick={handleAccessJira} fullWidth style={{ marginTop: '2rem', borderRadius: 10 }}>
                      Let's go !
                    </ButtonMaterial>
                  </>
              }
            </DialogContent>
            <DialogActions />
          </>
      }
    </Dialog>
  );
}

ImportJiraModal.propTypes = propTypes;
ImportJiraModal.defaultProps = defaultProps;

export default ImportJiraModal;
