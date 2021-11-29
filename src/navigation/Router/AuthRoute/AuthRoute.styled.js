import styled from 'styled-components';

import * as StyledLoading from 'components/Loading/Loading.styled';

export const LoadingContainer = styled.div`
  min-height: ${({ minHeight }) => `${minHeight}px`};

  ${StyledLoading.LoadingWrapper} {
    padding-top: 0px;
  }
`;
