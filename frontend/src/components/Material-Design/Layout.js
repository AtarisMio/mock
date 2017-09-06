import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { layoutFactory } from 'react-toolbox/lib/layout/Layout';
import { sidebarFactory } from 'react-toolbox/lib/layout/Sidebar';
import { navDrawerFactory } from 'react-toolbox/lib/layout/NavDrawer';
import { Panel } from 'react-toolbox/lib/layout/Panel';
import theme from 'react-toolbox/lib/layout/theme.css';
import { LAYOUT } from 'react-toolbox/lib/identifiers';

import { AppBar } from './AppBar';
import { Drawer } from './Drawer';

const Sidebar = sidebarFactory(Drawer);
const NavDrawer = navDrawerFactory(Drawer);
const ThemedSidebar = withStyles(theme)(themr(LAYOUT, theme)(Sidebar));
const ThemedNavDrawer = withStyles(theme)(themr(LAYOUT, theme)(NavDrawer));
const ThemedPanel = withStyles(theme)(themr(LAYOUT, theme)(Panel));
const Layout = layoutFactory(AppBar, ThemedNavDrawer, ThemedSidebar);
const ThemedLayout = withStyles(theme)(themr(LAYOUT, theme)(Layout));

export { Layout as RawLayout } from 'react-toolbox/lib/layout/Layout';
export { Sidebar as RawSidebar } from 'react-toolbox/lib/layout/Sidebar';
export { NavDrawer as RawNavDrawer } from 'react-toolbox/lib/layout/NavDrawer';
export { Panel as RawPanel };

export {
    ThemedLayout as Layout,
    ThemedSidebar as Sidebar,
    ThemedNavDrawer as NavDrawer,
    ThemedPanel as Panel
};

export default ThemedLayout;