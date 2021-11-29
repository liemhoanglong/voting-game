import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import CheckboxMaterial from 'components/Shared/CheckboxMaterial';
import GridHoverMaterial from 'components/Shared/GridHoverMaterial';

import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  handleClickIssue: PropTypes.func,
  issue: PropTypes.object,
};

const defaultProps = {
  handleClickIssue: () => { },
  issue: null,
};

const JiraIssueElement = (props) => {
  const { handleClickIssue, issue } = props;
  const issueCode = useMemo(() => issue.link.split('/'), []);

  return (
    <GridHoverMaterial
      onClick={handleClickIssue}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container wrap="nowrap" style={{ width: '85%' }}>
        <CheckboxMaterial
          checked={issue.selected}
          color="primary"
        />
        <div>
          <Styled.IssueText code>{issueCode.slice(-1)}</Styled.IssueText>
          <Styled.IssueText>{issue.issue}</Styled.IssueText>
        </div>
      </Grid>
      <Styled.IssueVoteScore>{issue.voteScore ? issue.voteScore : '-'}</Styled.IssueVoteScore>
    </GridHoverMaterial>
  );
};

JiraIssueElement.propTypes = propTypes;
JiraIssueElement.defaultProps = defaultProps;

export default JiraIssueElement;
