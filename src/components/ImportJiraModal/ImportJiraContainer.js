import React, { useMemo, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import { cloneDeep } from 'lodash';

import { Grid, Button } from '@material-ui/core';

import { removeMultiJiraLocalStorage } from 'utils/removeMultiLocalStorage.utils';
import { Colors } from 'constants/styles/Colors';
import arrowCurved from 'assets/svgs/arrow-curved.svg';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import CheckboxMaterial from 'components/Shared/CheckboxMaterial';
import CustomScrollbarsVirtualList from 'components/Shared/CustomScrollbarsVirtualList';
import GridHoverMaterial from 'components/Shared/GridHoverMaterial';
import JiraProjectElement from './JiraProjectElement';
import JiraIssueElement from './JiraIssueElement';

import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  projectListJira: PropTypes.array,
  setProjectListJira: PropTypes.func,
  issueListFromJira: PropTypes.object,
  setIssueListFromJira: PropTypes.func,
  handleClickProject: PropTypes.func,
  handleClickIssue: PropTypes.func,
  handleSearchIssue: PropTypes.func,
  handleImport: PropTypes.func,
  checkAll: PropTypes.bool,
  setCheckAll: PropTypes.func,
  handleClose: PropTypes.func,
  setShowWelcomeJiraModal: PropTypes.func,
};

const defaultProps = {
  projectListJira: null,
  setProjectListJira: () => { },
  issueListFromJira: null,
  setIssueListFromJira: () => { },
  handleClickProject: () => { },
  handleClickIssue: () => { },
  handleSearchIssue: () => { },
  handleImport: () => { },
  checkAll: false,
  setCheckAll: () => { },
  handleClose: () => { },
  setShowWelcomeJiraModal: () => { },
};

function ImportJiraContainer(props) {
  const {
    projectListJira, setProjectListJira, issueListFromJira, setIssueListFromJira,
    handleClickProject, handleSearchIssue, handleClickIssue, handleImport,
    checkAll, setCheckAll, handleClose, setShowWelcomeJiraModal,
  } = props;

  const projectListRef = useRef();
  const projectOuterRef = useRef();
  const issueListRef = useRef();
  const issueOuterRef = useRef();

  const projectListHeight = useMemo(() => projectListJira && Math.min(600, 60 * projectListJira.length), [projectListJira]);

  const issueListHeight = useMemo(() => issueListFromJira?.listIssue && Math.min(600, 60 * issueListFromJira.listIssue.length), [issueListFromJira]);

  // todo: need to check is exist issue.selected === false then break and setCheckAll(true) else setCheckAll(false)
  const handleClickAllIssue = useCallback(() => {
    let checkIssueNotSelected = false;
    for (let i = 0; i < issueListFromJira.listIssue.length; i++) {
      if (!issueListFromJira.listIssue[i].selected) {
        checkIssueNotSelected = true;
        break;
      }
    }
    const issueListFromJiraClone = cloneDeep(issueListFromJira);
    if (checkIssueNotSelected) {
      issueListFromJiraClone.listIssue.forEach((issue) => {
        issue.selected = true;
      });
      ReactDOM.unstable_batchedUpdates(() => {
        setCheckAll(true);
        setIssueListFromJira(issueListFromJiraClone);
      });
    } else {
      issueListFromJiraClone.listIssue.forEach((issue) => {
        issue.selected = false;
      });
      ReactDOM.unstable_batchedUpdates(() => {
        setCheckAll(false);
        setIssueListFromJira(issueListFromJiraClone);
      });
    }
  }, [issueListFromJira]);

  const getItemProjectKey = (idx, data) => {
    const { key } = data[idx].props.project;
    return key;
  };

  const getItemIssueKey = (idx, data) => {
    const { link } = data[idx].props.issue;
    return link;
  };

  const issueSelected = useMemo(() => {
    if (!issueListFromJira) return;
    let count = 0;
    issueListFromJira.listIssue.forEach((issue) => {
      issue.selected && ++count;
    });
    return count;
  }, [issueListFromJira]);

  const handleEraseCredential = () => {
    removeMultiJiraLocalStorage();
    ReactDOM.unstable_batchedUpdates(() => {
      setShowWelcomeJiraModal(true);
      setProjectListJira(null);
      handleClose();
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        lg={3}
        md={4}
        sm={12}
        style={{ borderRight: `2px solid ${Colors.PORCELAIN}` }}
      >
        <Grid>
          <Styled.Title>Project</Styled.Title>
          {
            projectListJira &&
            <List
              autoHeight
              height={projectListHeight}
              itemData={
                projectListJira.map((project) => (
                  <JiraProjectElement
                    handleClickProject={() => handleClickProject(project.key)}
                    project={project}
                  />
                ))
              }
              itemKey={getItemProjectKey}
              itemCount={projectListJira.length}
              itemSize={60}
              initialScrollOffset={0}
              ref={projectListRef}
              outerElementType={CustomScrollbarsVirtualList}
              outerRef={projectOuterRef}
            >
              {({ style, data, index }) => <div style={style}>{data[index]}</div>}
            </List>
          }
        </Grid>
        <ButtonMaterial
          onClick={handleSearchIssue}
          fullWidth
          style={{ marginTop: '1rem', borderRadius: 10 }}
        >
          Search issues
        </ButtonMaterial>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        lg={9}
        md={8}
        sm={12}
      >
        {
          issueListFromJira?.listIssue ?
            <GridHoverMaterial
              onClick={handleClickAllIssue}
            >
              <CheckboxMaterial checked={checkAll} />
              <span>Select all issues</span>
            </GridHoverMaterial>
            :
            <>
              <img src={arrowCurved} alt="arrow-curved" width={200} style={{ marginTop: '4rem' }} />
              <center>
                <Styled.NoIssueText>Please, search issues on the left</Styled.NoIssueText>
              </center>
            </>
        }
        {
          issueListFromJira?.listIssue &&
          <List
            autoHeight
            height={issueListHeight}
            itemData={
              issueListFromJira.listIssue.map((issue) => (
                <JiraIssueElement
                  handleClickIssue={() => handleClickIssue(issue.link)}
                  issue={issue}
                />
              ))
            }
            itemKey={getItemIssueKey}
            itemCount={issueListFromJira.listIssue.length}
            itemSize={60}
            initialScrollOffset={0}
            ref={issueListRef}
            outerElementType={CustomScrollbarsVirtualList}
            outerRef={issueOuterRef}
          >
            {({ style, data, index }) => <div style={style}>{data[index]}</div>}
          </List>
        }
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={handleEraseCredential}
              fullWidth
              variant="outlined"
              color="secondary"
              style={{ marginTop: '1rem', borderRadius: 10 }}
            >
              Erase credentials
            </Button>
          </Grid>
          <Grid item xs={6}>
            {
              issueListFromJira?.listIssue &&
              <ButtonMaterial onClick={handleImport} fullWidth style={{ marginTop: '1rem', borderRadius: 10 }}>
                Import {issueSelected === 0 ? '' : issueSelected} issues
              </ButtonMaterial>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ImportJiraContainer.propTypes = propTypes;
ImportJiraContainer.defaultProps = defaultProps;

export default ImportJiraContainer;
