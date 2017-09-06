import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Dialog } from 'react-toolbox/lib/dialog';
import theme from 'react-toolbox/lib/dialog/theme.css';

const ThemedDialog = withStyles(theme)(Dialog);

export { Dialog as RawDialog } from 'react-toolbox/lib/dialog/Dialog';

export { ThemedDialog };

export default ThemedDialog;