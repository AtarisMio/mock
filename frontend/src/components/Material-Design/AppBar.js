import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { appBarFactory } from 'react-toolbox/lib/app_bar/AppBar';
import theme from 'react-toolbox/lib/app_bar/theme.css';
import { APP_BAR } from 'react-toolbox/lib/identifiers';

import { IconButton } from './Button';

const AppBar = appBarFactory(IconButton);
const ThemedAppBar = withStyles(theme)(themr(APP_BAR, theme)(AppBar));

export { AppBar as RawAppBar } from 'react-toolbox/lib/app_bar/AppBar';

export { ThemedAppBar as AppBar };

export default ThemedAppBar;