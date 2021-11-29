import React from 'react';
import PropTypes from 'prop-types';

import TableCard from 'components/TableCard';
import * as Styled from './TableCardList.styled';

const propTypes = {
  users: PropTypes.array,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  teamId: PropTypes.string,
};

const defaultProps = {
  users: null,
  top: false,
  bottom: false,
  left: false,
  right: false,
  teamId: '',
};

function TableCardList(props) {
  const {
    users,
    top,
    bottom,
    left,
    right,
    teamId,
  } = props;
  return (
    <Styled.TableCardList
      top={top}
      bottom={bottom}
      left={left}
      right={right}
    >
      {users.map((user) => (
        user &&
        <TableCard
          key={user.userId}
          teamId={teamId}
          row={top || bottom}
          column={left || right}
          user={user}
        />
      ))}
    </Styled.TableCardList>
  );
}

TableCardList.propTypes = propTypes;
TableCardList.defaultProps = defaultProps;

export default TableCardList;
