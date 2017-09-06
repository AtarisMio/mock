import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import rippleFactory from 'react-toolbox/lib/ripple/Ripple';
import theme from 'react-toolbox/lib/ripple/theme.css';
import { RIPPLE } from 'react-toolbox/lib/identifiers';

const themedRippleFactory = options => rippleFactory({ ...options, theme });

export { rippleFactory, themedRippleFactory as Ripple };
export { theme as rippleTheme };
export default themedRippleFactory;