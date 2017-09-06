import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Overlay } from 'react-toolbox/lib/overlay/Overlay';
import theme from 'react-toolbox/lib/overlay/theme.css';
import { OVERLAY } from 'react-toolbox/lib/identifiers';

const ThemedOverlay = withStyles(theme)(themr(OVERLAY, theme)(Overlay));

export { Overlay as RawOverlay };

export { ThemedOverlay as Overlay };

export default ThemedOverlay;