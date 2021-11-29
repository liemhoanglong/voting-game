import React from 'react';
import PropTypes from 'prop-types';

import MemberListItem from '../MemberListItem';

import * as Styled from './MemberList.styled';

const propTypes = {
  allUsers: PropTypes.arrayOf(PropTypes.object),
  updateMemberRole: PropTypes.func,
  removeMember: PropTypes.func,
};

const defaultProps = {
  allUsers: [],
  updateMemberRole: () => {},
  removeMember: () => {},
};

function MemberList(props) {
  const {
    allUsers,
  } = props;
  return (
    <Styled.MemberListContainer>
      {allUsers.map((member, index) => (
        <MemberListItem
          key={member.email}
          memberIndex={index}
          name={member.name}
          description={member.email}
          role={member.role}
          update={props.updateMemberRole}
          remove={props.removeMember}
        />
      ))}
    </Styled.MemberListContainer>
  );
}

MemberList.propTypes = propTypes;
MemberList.defaultProps = defaultProps;

export default MemberList;
