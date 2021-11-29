import styled, { css } from 'styled-components';
import { Colors } from 'constants/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Boxshadows } from 'constants/styles/boxShadow';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: scroll;
  height: calc(100vh - 80px);
  background-color: ${Colors.LIGHT_BLUE};

`;

export const Container = styled.div`
  border-radius: 16px;
  max-height: calc(100vh - 30px);
  max-width: calc(100% - 30px);
  overflow: hidden;

  position: relative;
  box-shadow: ${Boxshadows.PURPLE_SHADOW};
`;

export const Content = styled.div`
  background-color: ${Colors.WHITE};
  min-width: 350px;
  padding: 32px;
  position: relative;

  ${(props) => props.horizontalModal && css`
    width: 600px;
  `}

   ${(props) => props.cardModal && css`
      min-width: 380px;
      padding: 32px;
  `}
`;

export const Title = styled.div`
  margin: 0px 0 20px;
  font-size: 32px;
  text-align: center;
  font-weight: 500;
`;

export const CloseIconStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    cursor: 'pointer',
  },
});
