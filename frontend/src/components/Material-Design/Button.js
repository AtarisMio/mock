import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { buttonFactory } from 'react-toolbox/lib/button/Button';
import { iconButtonFactory } from 'react-toolbox/lib/button/IconButton';
import { browseButtonFactory } from 'react-toolbox/lib/button/BrowseButton';
import theme from 'react-toolbox/lib/button/theme.css';
import { BUTTON } from 'react-toolbox/lib/identifiers';

import { FontIcon } from './FontIcon';
import themedRippleFactory, { rippleTheme } from './Ripple';

const Button = buttonFactory(
    themedRippleFactory({ centered: false }),
    FontIcon
);
const IconButton = iconButtonFactory(
    themedRippleFactory({ centered: true }),
    FontIcon
);
const BrowseButton = browseButtonFactory(
    themedRippleFactory({ centered: false }),
    FontIcon
);

const ThemedButton = withStyles(theme, rippleTheme)(themr(BUTTON, theme)(Button));
const ThemedIconButton = withStyles(theme, rippleTheme)(themr(BUTTON, theme)(IconButton));
const ThemedBrowseButton = withStyles(theme, rippleTheme)(themr(BUTTON, theme)(BrowseButton));

export { Button as RawButton } from 'react-toolbox/lib/button/Button';
export { IconButton as RawIconButton } from 'react-toolbox/lib/button/IconButton';
export { BrowseButton as RawBrowseButton } from 'react-toolbox/lib/button/BrowseButton';

export { ThemedButton as Button, ThemedIconButton as IconButton, ThemedBrowseButton as BrowseButton };

export default ThemedButton;