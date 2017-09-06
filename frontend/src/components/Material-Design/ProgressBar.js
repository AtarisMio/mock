import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import theme from 'react-toolbox/lib/progress_bar/theme.css';

const ThemedProgressBar = withStyles(theme)(ProgressBar);

export { ProgressBar as RawProgressBar } from 'react-toolbox/lib/progress_bar/ProgressBar';

export { ThemedProgressBar as ProgressBar };

export default ThemedProgressBar;