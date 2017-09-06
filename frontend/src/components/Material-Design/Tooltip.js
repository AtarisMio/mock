import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Tooltip } from 'react-toolbox/lib/tooltip';
import theme from 'react-toolbox/lib/tooltip/theme.css';

const ThemedTooltip = withStyles(theme)(Tooltip);

export { Tooltip as RawTooltip } from 'react-toolbox/lib/tooltip/Tooltip';

export { ThemedTooltip };

export default ThemedTooltip;