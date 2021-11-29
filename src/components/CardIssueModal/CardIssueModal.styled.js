import styled from 'styled-components';
import { Colors } from 'constants/styles';
import { makeStyles } from '@material-ui/core/styles';

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
`;

export const ButtonSaveModalIssueStyles = makeStyles({
  root: {
    borderRadius: '4px',
    backgroundColor: Colors.DODGER_BLUE,
    marginTop: '10px',
  },

  label: {
    fontWeight: 600,
  },
});
