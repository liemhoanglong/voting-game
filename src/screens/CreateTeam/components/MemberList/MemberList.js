import React from 'react';
import PropTypes from 'prop-types';
import MemberListItem from '../MemberListItem';

import * as Styled from './MemberList.styled';

const propTypes = {
  owner: PropTypes.object,
  allUsers: PropTypes.arrayOf(PropTypes.object),
  updateMemberRole: PropTypes.func,
  removeMember: PropTypes.func,
};

const defaultProps = {
  owner: {},
  allUsers: [],
  updateMemberRole: () => {},
  removeMember: () => {},
};

function MemberList(props) {
  const {
    owner,
    allUsers,
    updateMemberRole,
    removeMember,
  } = props;
  return (
    <Styled.MemberListContainer>
      <MemberListItem name={owner.name} description={owner.email} role={owner.role} owner />
      {allUsers.map((member, index) => (
        <MemberListItem
          key={member.email}
          memberIndex={index}
          name={member.name}
          description={member.email}
          role={member.role}
          update={updateMemberRole}
          remove={removeMember}
        />
      ))}
    </Styled.MemberListContainer>
  );
}

MemberList.propTypes = propTypes;
MemberList.defaultProps = defaultProps;

export default MemberList;
