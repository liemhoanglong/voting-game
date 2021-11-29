import React from 'react';
import PropTypes from 'prop-types';

import CheckboxMaterial from 'components/Shared/CheckboxMaterial';

import * as Styled from './ImportJiraModal.styled';

const propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  style: PropTypes.object,
};

const defaultProps = {
  data: null,
  index: -1,
  style: null,
};

const IssueListJira = (props) => {
  const { data, index, style } = props;
  const temp = data.listIssue[index].link.split('/');
  return (
    <Styled.IssueWrapper key={index} style={style} onClick={() => data.handleClickIssue(index)}>
      <Styled.IssueTextGroup style={{ width: '85%' }}>
        <CheckboxMaterial
          checked={data.issueChoices.findIndex((e) => e.link === data.listIssue[index].link) > -1 || false}
          color="primary"
        />
        <div>
          <Styled.IssueText style={{ color: '#4D9EFF', fontWeight: 500 }}> {temp[temp.length - 1]}</Styled.IssueText>
          <Styled.IssueText>{data.listIssue[index].issue}</Styled.IssueText>
        </div>
      </Styled.IssueTextGroup>
      <Styled.IssueVoteScore>{data.listIssue[index].voteScore ? data.listIssue[index].voteScore : '-'}</Styled.IssueVoteScore>
    </Styled.IssueWrapper>
  );
};

IssueListJira.propTypes = propTypes;
IssueListJira.defaultProps = defaultProps;

export default IssueListJira;
