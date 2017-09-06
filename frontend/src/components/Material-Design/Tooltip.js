import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import tooltipFactory from 'react-toolbox/lib/tooltip/Tooltip';
import theme from 'react-toolbox/lib/tooltip/theme.css';
import { TOOLTIP } from 'react-toolbox/lib/identifiers';

const themedTooltipFactory = (...args) => withStyles(theme)(themr(TOOLTIP, theme)(tooltipFactory(...args)));
const ThemedTooltip = themedTooltipFactory({ theme });

export { tooltipFactory as RawtooltipFactory } from 'react-toolbox/lib/tooltip/Tooltip';

export { ThemedTooltip as Tooltip, themedTooltipFactory as tooltipFactory };

export default ThemedTooltip;