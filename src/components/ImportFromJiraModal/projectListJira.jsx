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

const projectListJira = (props) => {
  const { data, index, style } = props;
  return (
    <Styled.IssueWrapper style={style} onClick={() => data.handleClickProject(data.projectListJira[index].key)}>
      <Styled.IssueTextGroup style={{ width: '85%' }}>
        <CheckboxMaterial
          checked={data.projectChoices.findIndex((e) => e === data.projectListJira[index].key) > -1 || false}
          color="primary"
        />
        <div>
          <Styled.IssueText style={{ color: '#4D9EFF', fontWeight: 500 }}> {data.projectListJira[index].key}</Styled.IssueText>
          <Styled.IssueText>{data.projectListJira[index].name}</Styled.IssueText>
        </div>
      </Styled.IssueTextGroup>
    </Styled.IssueWrapper>
  );
};

projectListJira.propTypes = propTypes;
projectListJira.defaultProps = defaultProps;

export default projectListJira;
