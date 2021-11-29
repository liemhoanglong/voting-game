import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const SelectAllIssues = styled.div`
  cursor: pointer;
`;

export const IssueWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  margin-bottom: 1rem; 
`;

export const IssueTextGroup = styled.div`
  display: flex;
`;

export const IssueText = styled.div`
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  word-break: break-word;
  -webkit-box-orient: vertical;
`;

export const IssueVoteScore = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(26 41 53 / 14%);
  text-align: center
`;

export const CustomGrid = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})((props) => <Grid {...props} />);
