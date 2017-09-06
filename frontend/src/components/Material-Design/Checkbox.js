import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { checkboxFactory } from 'react-toolbox/lib/checkbox/Checkbox';
import checkFactory from 'react-toolbox/lib/checkbox/Check';
import theme from 'react-toolbox/lib/checkbox/theme.css';
import { CHECKBOX } from 'react-toolbox/lib/identifiers';

import themedRippleFactory, { rippleTheme } from './Ripple';

const ThemedCheck = checkFactory(
    themedRippleFactory({ centered: true, spread: 2.6 })
);
const ThemedCheckbox = withStyles(theme, rippleTheme)(themr(CHECKBOX, theme)(checkboxFactory(ThemedCheck)));

export { Checkbox as RawCheckbox } from 'react-toolbox/lib/checkbox/Checkbox';

export { ThemedCheckbox as Checkbox };

export default ThemedCheckbox;