import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Drawer } from 'react-toolbox/lib/drawer';
import theme from 'react-toolbox/lib/drawer/theme.css';

const ThemedDrawer = withStyles(theme)(Drawer);

export { Drawer as RawDrawer } from 'react-toolbox/lib/drawer/Drawer';

export { ThemedDrawer as Drawer };

export default ThemedDrawer;