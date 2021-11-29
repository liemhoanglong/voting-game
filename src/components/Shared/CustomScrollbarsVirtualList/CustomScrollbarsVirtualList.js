import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const propTypes = {
  onScroll: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  onScroll: () => { },
  style: null,
};

const CustomScrollbars = ({
  onScroll,
  forwardedRef,
  style,
  children,
}) => {
  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, [forwardedRef]);
  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: 'hidden' }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

CustomScrollbars.propTypes = propTypes;
CustomScrollbars.defaultProps = defaultProps;

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

export default CustomScrollbarsVirtualList;
