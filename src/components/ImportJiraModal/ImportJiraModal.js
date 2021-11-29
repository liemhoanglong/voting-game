import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import produce from 'immer';
import { cloneDeep } from 'lodash';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Slide, Button, Grid, TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import CloseIcon from '@material-ui/icons/Close';

import { teamService } from 'services';
import { removeMultiJiraLocalStorage } from 'utils/removeMultiLocalStorage.utils';
import { LocalStorageKey } from 'constants/localStorage';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import Loading from 'components/Loading';
import ImportJiraContainer from './ImportJiraContainer';

const propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  projectListJira: PropTypes.array,
  setProjectListJira: PropTypes.func,
  issueListFromJira: PropTypes.object,
  setIssueListFromJira: PropTypes.func,
  setShowJiraModal: PropTypes.func,
  handleClose: PropTypes.func,
  setLoading: PropTypes.func,
  importIssue: PropTypes.func,
  setShowWelcomeJiraModal: PropTypes.func,
};

const defaultProps = {
  open: false,
  loading: false,
  projectListJira: null,
  setProjectListJira: () => { },
  issueListFromJira: null,
  setIssueListFromJira: () => { },
  setShowJiraModal: () => { },
  handleClose: () => { },
  setLoading: () => { },
  importIssue: () => { },
  setShowWelcomeJiraModal: () => { },
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function ImportJiraModal(props) {
  const {
    open, loading, setLoading, setShowJiraModal, handleClose,
    projectListJira, setProjectListJira, issueListFromJira, setIssueListFromJira,
    importIssue, setShowWelcomeJiraModal,
  } = props;
  const { pathname } = useLocation();
  const roomId = pathname.split('-')[pathname.split('-').length - 1];
  const siteListJira = JSON.parse(localStorage.getItem(LocalStorageKey.JIRA_SITE_LIST));
  const [siteChoices, setSiteChoices] = useState({
    id: siteListJira ? siteListJira[0].id : '',
    url: siteListJira ? siteListJira[0].url : '',
  });
  const [checkAll, setCheckAll] = useState(false);

  const handleClickIssue = useCallback((link) => {
    setIssueListFromJira(
      produce((draftIssue) => {
        const project = draftIssue.listIssue.find((issue) => issue.link === link);
        project.selected = !project.selected;
      }),
    );
  }, []);

  const handleClickProject = useCallback((key) => {
    setProjectListJira(
      produce((draftProject) => {
        const project = draftProject.find((project) => project.key === key);
        project.selected = !project.selected;
      }),
    );
  }, []);

  // todo: before import issue need to create issue list selected to send for server and reset property selected in issueListFromJira.listIssue
  const handleImport = async () => {
    try {
      const issueListSelected = [];
      let issueClone = null;
      const issueListFromJiraClone = cloneDeep(issueListFromJira);
      for (let i = 0; i < issueListFromJira.listIssue.length; i++) {
        // clone issue
        issueClone = cloneDeep(issueListFromJira.listIssue[i]);
        if (issueClone.selected) {
          // delete property selected
          delete issueClone.selected;
          // reset property selected to false
          issueListFromJiraClone.listIssue[i].selected = false;
          issueListSelected.push(issueClone);
        }
      }
      setLoading(true);
      await teamService.importListCardIssue({ teamId: roomId, issues: issueListSelected });
      // update property selected to false for each issue in issueListFromJira.listIssue
      ReactDOM.unstable_batchedUpdates(() => {
        setIssueListFromJira(issueListFromJiraClone);
        setCheckAll(false);
        setLoading(false);
      });
      handleClose();
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSearchIssue = async () => {
    // The token will be expired after 1 hour = 3600 seconds
    // but the internet is not always stable so I decided to check greater than 3500 seconds
    // for the token is expired -> 3500 * 1000 milliseconds
    if (new Date().getTime() - parseInt(localStorage.getItem(LocalStorageKey.JIRA_CREATE)) > 3500 * 1000) {
      removeMultiJiraLocalStorage();
      ReactDOM.unstable_batchedUpdates(() => {
        setShowJiraModal(false);
        setShowWelcomeJiraModal(true);
      });
    }
    // search projects selected and join to string like PROJECT_A,PROJECT_B
    const projectListSelected = [];
    projectListJira.forEach((project) => {
      project.selected && projectListSelected.push(project.name);
    });
    if (projectListSelected.length === 0) return;
    try {
      setLoading(true);
      await importIssue(projectListSelected.join());
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setCheckAll(false);
    handleClose();
  };

  const getAllProject = async () => {
    try {
      setLoading(true);
      const projectListRes = await teamService.getListProjectFromJira({
        jiraCloudId: siteChoices.id,
        jiraToken: localStorage.getItem(LocalStorageKey.JIRA_TOKEN),
      });
      // add props selected to use method produce from immer package
      projectListRes.forEach((project) => {
        project.selected = false;
      });
      setProjectListJira(projectListRes);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSubmitSite = () => {
    localStorage.setItem(LocalStorageKey.JIRA_CLOUD_ID, siteChoices.id);
    localStorage.setItem(LocalStorageKey.JIRA_URL, siteChoices.url);
    getAllProject();
  };

  const checkJiraCloudId = localStorage.getItem(LocalStorageKey.JIRA_CLOUD_ID);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="Modal-import-issue-from-jira"
      maxWidth={checkJiraCloudId ? 'md' : 'xs'}
      fullWidth
      scroll="paper"
      PaperProps={{
        style: { borderRadius: '1.6rem' },
      }}
    >
      {
        loading ?
          <>
            <Loading />
            <center style={{ marginTop: 175, marginBottom: 100 }}>Getting issues from JIRA...</center>
          </>
          :
          <>
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
              Import from JIRA
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {// choice site
                !checkJiraCloudId && siteListJira &&
                <>
                  <h2 style={{ margin: 0 }}>Just one more step</h2>
                  <br />
                  <p>which site do you want to use?</p>
                  <form onSubmit={handleSubmitSite}>
                    <Autocomplete
                      value={siteListJira.find((e) => e.id === siteChoices.id) || { id: '', url: '' }}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setSiteChoices({ id: newValue.id, url: newValue.url });
                        } else {
                          setSiteChoices({ id: '', url: '' });
                        }
                      }}
                      id="Site-jira"
                      options={siteListJira}
                      getOptionLabel={(option) => option?.name || ''}
                      getOptionSelected={(option, value) => (option.id === (value?.id || ''))}
                      renderInput={(params) => <TextField {...params} label="Site" variant="outlined" required />}
                    />
                    <br />
                    <br />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{ marginTop: '1rem', borderRadius: 10 }}
                          fullWidth
                          onClick={() => handleClose()}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <ButtonMaterial
                          fullWidth
                          style={{ marginTop: '1rem', borderRadius: 10 }}
                          type="submit"
                        >
                          Save and continue
                        </ButtonMaterial>
                      </Grid>
                    </Grid>
                  </form>
                </>
              }
              {// import issue
                checkJiraCloudId && projectListJira &&
                <ImportJiraContainer
                  projectListJira={projectListJira}
                  setProjectListJira={setProjectListJira}
                  issueListFromJira={issueListFromJira}
                  setIssueListFromJira={setIssueListFromJira}
                  handleClickProject={handleClickProject}
                  handleClickIssue={handleClickIssue}
                  handleSearchIssue={handleSearchIssue}
                  handleImport={handleImport}
                  checkAll={checkAll}
                  setCheckAll={setCheckAll}
                  handleClose={() => handleClose()}
                  setShowWelcomeJiraModal={setShowWelcomeJiraModal}
                />
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
