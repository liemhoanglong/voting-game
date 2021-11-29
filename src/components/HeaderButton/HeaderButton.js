import React from 'react';
import PropTypes from 'prop-types';

import GameHeaderButton from 'components/GameHeaderButton';
import UserIconDropdown from 'components/UserIconDropdown';

const propTypes = {
  inGame: PropTypes.bool,
};

const defaultProps = {
  inGame: false,
};

function HeaderButton(props) {
  const {
    inGame,
  } = props;
  return (
    <>
      {inGame && <GameHeaderButton />}
      <UserIconDropdown reverse={inGame} />
    </>
  );
}

HeaderButton.propTypes = propTypes;
HeaderButton.defaultProps = defaultProps;

export default HeaderButton;
