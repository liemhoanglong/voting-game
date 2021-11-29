import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import CheckboxMaterial from 'components/Shared/CheckboxMaterial';
import GridHoverMaterial from 'components/Shared/GridHoverMaterial';

import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  handleClickProject: PropTypes.func,
  project: PropTypes.object,
};

const defaultProps = {
  handleClickProject: () => { },
  project: null,
};

const JiraProjectElement = (props) => {
  const { handleClickProject, project } = props;

  return (
    <GridHoverMaterial
      onClick={handleClickProject}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container wrap="nowrap">
        <CheckboxMaterial
          checked={project.selected}
          color="primary"
        />
        <Grid>
          <Styled.IssueText code>{project.key}</Styled.IssueText>
          <Styled.IssueText>{project.name}</Styled.IssueText>
        </Grid>
      </Grid>
    </GridHoverMaterial>
  );
};

JiraProjectElement.propTypes = propTypes;
JiraProjectElement.defaultProps = defaultProps;

export default JiraProjectElement;
