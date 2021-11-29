import React from 'react';
import { useHistory } from 'react-router-dom';

import SvgPageNotFound from 'assets/svgs/page_not_found.svg';
import * as Styled from './PageNotFound.styled';

function PageNotFound() {
  const history = useHistory();
  return (
    <Styled.Wrapper>
      <Styled.Img src={SvgPageNotFound} />
      <Styled.Title>
        Page Not Found
      </Styled.Title>
      <Styled.Message>
        The page you are looking for doesn’t seem to exist
      </Styled.Message>
      <Styled.GoToHomeButton onClick={() => history.push('/')}>
        Go to homepage
      </Styled.GoToHomeButton>
    </Styled.Wrapper>
  );
}

export default PageNotFound;
