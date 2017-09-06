import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { ProgressBar } from 'react-toolbox/lib/progress_bar/ProgressBar';
import theme from 'react-toolbox/lib/progress_bar/theme.css';
import { PROGRESS_BAR } from 'react-toolbox/lib/identifiers';

const ThemedProgressBar = withStyles(theme)(themr(PROGRESS_BAR, theme)(ProgressBar));

export { ProgressBar as RawProgressBar, ThemedProgressBar as ProgressBar };

export default ThemedProgressBar;