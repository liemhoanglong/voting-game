import React from 'react';
import PropTypes from 'prop-types';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './TimeSelectButton.styled';

const propTypes = {
  selected: PropTypes.bool,
  time: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  selected: false,
  time: 0,
  onClick: () => { },
};

function TimeSelectButton(props) {
  const {
    selected,
    time,
    onClick,
  } = props;
  const timeSelectClasses = Styled.TimeSelect();
  return (
    <ButtonMaterial
      theme="transparent"
      fullWidth
      classes={{
        root: Styled.TimeSelect({ selected }).root,
        label: timeSelectClasses.label,
      }}
      onClick={onClick}
    >
      {time}s
    </ButtonMaterial>
  );
}

TimeSelectButton.propTypes = propTypes;
TimeSelectButton.defaultProps = defaultProps;

export default TimeSelectButton;
