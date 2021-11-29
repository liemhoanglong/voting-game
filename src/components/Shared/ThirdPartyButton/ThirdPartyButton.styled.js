import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'constants/styles';

export const ThirdPartyButtonStyles = makeStyles({
  root: {
    width: '100%',
    fontSize: '16px',
    color: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    textTransform: 'none',
    marginBottom: '20px',
    boxShadow: '0 3px 5px -1px rgb(128 147 167 / 20%), 0 1px 18px 0 rgb(128 147 167 / 12%), 0 6px 10px 0 rgb(128 147 167 / 14%)',
  },
  label: {
    fontWeight: 600,
  },
});

export const ThirdPartyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ThirdPartyIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  left: 10px;
  border-right: 1px solid  ${Colors.CLOUDY_BLUE};
  padding-right: 10px;
`;
