import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Snackbar } from 'react-toolbox/lib/snackbar';
import theme from 'react-toolbox/lib/snackbar/theme.css';

const ThemedSnackbar = withStyles(theme)(Snackbar);

export { Snackbar as RawSnackbar } from 'react-toolbox/lib/snackbar/Snackbar';

export { ThemedSnackbar as Snackbar };

export default ThemedSnackbar;