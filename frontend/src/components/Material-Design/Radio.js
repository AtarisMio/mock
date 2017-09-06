import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { radioButtonFactory } from 'react-toolbox/lib/radio/RadioButton';
import { radioGroupFactory } from 'react-toolbox/lib/radio/RadioGroup';
import radioFactory from 'react-toolbox/lib/radio/Radio';

import theme from 'react-toolbox/lib/radio/theme.css';
import { RADIO } from 'react-toolbox/lib/identifiers';

import themedRippleFactory, { rippleTheme } from './Ripple';

const Radio = radioFactory(
    themedRippleFactory({ centered: true, spread: 2.6 })
);
const ThemedRadio = withStyles(theme, rippleTheme)(themr(RADIO, theme)(Radio));
const RadioButton = radioButtonFactory(ThemedRadio);
const ThemedRadioButton = withStyles(theme, rippleTheme)(themr(RADIO, theme)(RadioButton));
const RadioGroup = radioGroupFactory(ThemedRadioButton);
const ThemedRadioGroup = withStyles(theme, rippleTheme)(themr(RADIO, theme)(RadioGroup));

export { RadioButton as RawRadioButton } from 'react-toolbox/lib/radio/RadioButton';
export { RadioGroup as RawRadioGroup } from 'react-toolbox/lib/radio/RadioGroup';

export {
    ThemedRadioButton as RadioButton,
    ThemedRadioGroup as RadioGroup
};

export default ThemedRadioButton;