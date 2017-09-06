import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { navigationFactory } from 'react-toolbox/lib/navigation/Navigation';
import theme from 'react-toolbox/lib/navigation/theme.css';
import { NAVIGATION } from 'react-toolbox/lib/identifiers';

// Link pollify
import { Link } from './Link';
import { Button } from './Button';

const Navigation = navigationFactory(Button, Link);
const ThemedNavigation = withStyles(theme)(themr(NAVIGATION, theme)(Navigation));

export { Navigation as RawNavigation, ThemedNavigation as Navigation };

export default ThemedNavigation;