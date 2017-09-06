import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from 'react-toolbox/lib/app_bar/theme.css';

const ThemedAppBar = withStyles(theme)(AppBar);

export { AppBar as RawAppBar } from 'react-toolbox/lib/app_bar/AppBar';

export { ThemedAppBar as AppBar };

export default ThemedAppBar;