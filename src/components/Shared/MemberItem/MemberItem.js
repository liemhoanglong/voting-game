import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createNameAvatar } from 'utils/getFirstLetterName.util';

import * as Styled from './MemberItem.styled';

const propTypes = {
  suffix: PropTypes.node,
  name: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  setSelected: PropTypes.func,
  onClick: PropTypes.func,
};

const defaultProps = {
  suffix: null,
  name: '',
  description: '',
  disabled: false,
  selected: false,
  setSelected: () => {},
  onClick: null,
};

function MemberItem(props) {
  const {
    suffix,
    name,
    description,
    disabled,
    selected,
    setSelected,
    onClick,
  } = props;

  const title = name || 'Pending user';
  const shortName = createNameAvatar(name);

  useEffect(() => {
    if (disabled) {
      setSelected(false);
    }
  }, [selected, disabled]);

  return (
    <Styled.ItemContainer
      disabled={disabled}
      $clickable={Boolean(onClick)}
      onClick={() => { if (!disabled) onClick(); }}
      selected={selected}
    >
      <Styled.Avatar>{shortName}</Styled.Avatar>
      <Styled.TextContainer>
        <Styled.Title $hasName={Boolean(name)}>{title}</Styled.Title>
        {description && <Styled.Description>{description}</Styled.Description>}
      </Styled.TextContainer>
      {suffix}
    </Styled.ItemContainer>
  );
}

MemberItem.propTypes = propTypes;
MemberItem.defaultProps = defaultProps;

export default MemberItem;
