import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

export const CustomTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip);
