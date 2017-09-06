import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { drawerFactory } from 'react-toolbox/lib/drawer/Drawer';
import theme from 'react-toolbox/lib/drawer/theme.css';
import { DRAWER } from 'react-toolbox/lib/identifiers';

import { Overlay } from './Overlay';

const Drawer = drawerFactory(Overlay);
const ThemedDrawer = withStyles(theme)(themr(DRAWER, theme)(Drawer));

export { Drawer as RawDrawer } from 'react-toolbox/lib/drawer/Drawer';

export { ThemedDrawer as Drawer };

export default ThemedDrawer;