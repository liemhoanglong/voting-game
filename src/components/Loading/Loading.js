import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './Loading.styled';

const propTypes = {
  fullScreen: PropTypes.bool,
};

const defaultProps = {
  fullScreen: false,
};

function Loading(props) {
  return (
    <Styled.LoadingWrapper {...props}>
      <Styled.LoadingContainer>
        <Styled.Loader>
          <Styled.RobotContainer>
            <Styled.Robot />
          </Styled.RobotContainer>
        </Styled.Loader>
      </Styled.LoadingContainer>
    </Styled.LoadingWrapper>
  );
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
