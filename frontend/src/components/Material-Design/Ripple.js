import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Ripple } from 'react-toolbox/lib/ripple';
import theme from 'react-toolbox/lib/ripple/theme.css';

const ThemedRipple = (...args) => withStyles(theme)(Ripple(...args));

export { default as RawRipple } from 'react-toolbox/lib/ripple/Ripple';
export { ThemedRipple };

export default ThemedRipple;