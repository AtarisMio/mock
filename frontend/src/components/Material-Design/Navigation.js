import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { themr } from 'react-css-themr';
import { NAVIGATION } from 'react-toolbox/lib/identifiers';

import { navigationFactory } from 'react-toolbox/lib/navigation/Navigation';
import theme from 'react-toolbox/lib/navigation/theme.css';

// Link pollify
import { RawLink } from './Link';
import { RawButton } from './Button';

const Navigation = navigationFactory(RawButton, RawLink);
const ThemedNavigation = withStyles(theme)(themr(NAVIGATION, theme)(navigationFactory(RawButton, RawLink)));

export { Navigation as RawNavigation, ThemedNavigation };

export default ThemedNavigation;