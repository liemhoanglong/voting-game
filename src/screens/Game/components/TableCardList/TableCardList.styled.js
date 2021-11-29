import styled, { css } from 'styled-components';

export const TableCardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => (props.top || props.bottom) &&
    css`
    align-items: stretch;
    min-height: 119px;
  `}

  ${(props) => props.top &&
    css`
    grid-area: top;
    padding-bottom: 10px;
  `}

  ${(props) => props.bottom &&
    css`
    grid-area: bottom;
    padding-top: 10px;
  `}

  ${(props) => (props.left || props.right) &&
    css`
    flex-direction: column-reverse;
    padding: 110px 0;
    min-width: 110px;
  `}

  ${(props) => props.left &&
    css`
    grid-area: left;
    padding-right: 10px;
  `}

  ${(props) => props.right &&
    css`
    grid-area: right;
    padding-left: 10px;
  `}
`;
