import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export const CustomCheckbox = withStyles({
  root: {
    color: 'gray',
    '&$checked': {
      color: blue[400],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
