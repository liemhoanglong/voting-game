import React from 'react';
import { Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const GridHoverMaterial = withStyles({
  root: {
    cursor: 'pointer',
  },
})((props) => <Grid {...props} />);

export default GridHoverMaterial;
