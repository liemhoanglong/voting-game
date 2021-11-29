import React from 'react';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { Colors } from 'constants/styles/Colors';

export const Title = styled.p`
  font-weight: 500;
  margin: 5px 0 10px 10px;
  font-size: 20px;
`;

export const NoIssueText = styled.p`
  color: ${Colors.GRAY_CHATEAU};
  margin: 1rem 0 3rem 0;
  font-size: 20px;
`;

export const IssueText = styled.p`
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  word-break: break-word;
  -webkit-box-orient: vertical;
  color: ${(props) => props.code && Colors.DODGER_BLUE}; 
  font-weight: ${(props) => props.code && 500};
`;

export const IssueVoteScore = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(26 41 53 / 14%);
  margin-right: 10px;
  cursor: pointer;
`;

export const SelectedGrid = withStyles({
  root: {
    cursor: 'pointer',
  },
})((props) => <Grid {...props} />);
