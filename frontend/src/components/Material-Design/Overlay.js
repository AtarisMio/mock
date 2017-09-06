import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Overlay } from 'react-toolbox/lib/overlay';
import theme from 'react-toolbox/lib/overlay/theme.css';

const ThemedOverlay = withStyles(theme)(Overlay);

export { Overlay as RawOverlay } from 'react-toolbox/lib/overlay/Overlay';

export { ThemedOverlay as Overlay };

export default ThemedOverlay;