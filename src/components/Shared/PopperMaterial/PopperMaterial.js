import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const propTypes = {
  clickAwayHandler: PropTypes.func,
};

const defaultProps = {
  clickAwayHandler: () => {},
};

function PopperMaterial(props) {
  const { clickAwayHandler, ...otherProps } = props;
  return (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper
        {...otherProps}
        style={{ zIndex: '1000000' }}
      />
    </ClickAwayListener>
  );
}

PopperMaterial.propTypes = propTypes;
PopperMaterial.defaultProps = defaultProps;

export default PopperMaterial;
