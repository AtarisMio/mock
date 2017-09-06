import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { snackbarFactory } from 'react-toolbox/lib/snackbar/Snackbar';
import theme from 'react-toolbox/lib/snackbar/theme.css';
import { SNACKBAR } from 'react-toolbox/lib/identifiers';

import { Button } from './Button';

const Snackbar = snackbarFactory(Button);
const ThemedSnackbar = withStyles(theme)(themr(SNACKBAR, theme)(Snackbar));

export { Snackbar as RawSnackbar } from 'react-toolbox/lib/snackbar/Snackbar';

export { ThemedSnackbar as Snackbar };

export default ThemedSnackbar;