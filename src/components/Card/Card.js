import React from 'react';
import PropTypes from 'prop-types';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './Card.styled';

const propTypes = {
  point: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  point: 0,
  selected: false,
  onClick: () => { },
};

function Card(props) {
  const {
    point,
    selected,
    onClick,
  } = props;

  return (
    <ButtonMaterial className={Styled.CardStyle({ $selected: selected }).root} onClick={onClick}>
      {point}
    </ButtonMaterial>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
