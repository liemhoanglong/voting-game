import styled from 'styled-components';
import { Colors } from 'constants/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const UsernameWrapper = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  height: 38px;
`;

export const NameWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.online ? Colors.MAGIC_MINT : Colors.SEA_PINK)};
  margin-right: 8px;
`;

export const DivideRoleSelector = styled.div`
    background-color: rgba(39,61,87,.1);
    border: none;
    height: 1px;
`;

export const RoleSelectStyles = makeStyles({
  label: {
    fontSize: '16px',
    fontWeight: 600,
  },
});

export const TextWarning = styled.p`
    font-weight: 600;
    color: ${Colors.POMEGRANATE};
    margin: 0 0;
`;

export const SelectRoleStyle = makeStyles({
  root: {
    color: Colors.DODGER_BLUE,
    borderRadius: '5px',
    padding: ' 5px 10px',
  },
  label: {
    fontSize: '15px !important',
    fontWeight: 'normal !important',
  },
});

export const UsernameTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);

export const RoleWrapper = styled.p`
  font-size: 15px;
  font-weight: normal;
  margin: 0;
  padding: 7px 12px;
  color: ${(props) => (props.role === 'Admin' ? Colors.RED : Colors.BLUE_GREY)};
`;

export const ExpandIconRotate = makeStyles({
  root: {
    transform: (props) => (props.open === true ? 'rotate(180deg)' : 'rotate(0deg)'),
  },
});
