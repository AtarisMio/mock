import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { switchFactory } from 'react-toolbox/lib/switch/Switch';
import thumbFactory from 'react-toolbox/lib/switch/Thumb';
import theme from 'react-toolbox/lib/switch/theme.css';
import { SWITCH } from 'react-toolbox/lib/identifiers';

import themedRippleFactory, { rippleTheme } from './Ripple';

const ripple = themedRippleFactory({ centered: true, spread: 2.6 });thumbFactory(ripple)
const Thumb = thumbFactory(ripple);
const ThemedThumb = Thumb;
const Switch = switchFactory(ThemedThumb);
const ThemedSwitch = withStyles(theme, rippleTheme)(themr(SWITCH, theme)(Switch));

export { Switch as RawSwitch } from 'react-toolbox/lib/switch/Switch';

export { ThemedSwitch as Switch };

export default ThemedSwitch;