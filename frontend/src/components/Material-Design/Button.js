import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
    Button,
    IconButton,
    BrowseButton
} from 'react-toolbox/lib/button';
import theme from 'react-toolbox/lib/button/theme.css';

const ThemedButton = withStyles(theme)(Button);
const ThemedIconButton = withStyles(theme)(IconButton);
const ThemedBrowseButton = withStyles(theme)(BrowseButton);

export { Button as RawButton } from 'react-toolbox/lib/button/Button';
export { IconButton as RawIconButton } from 'react-toolbox/lib/button/IconButton';
export { BrowseButton as RawBrowseButton } from 'react-toolbox/lib/button/BrowseButton';

export { ThemedButton, ThemedIconButton, ThemedBrowseButton };

export default ThemedButton;