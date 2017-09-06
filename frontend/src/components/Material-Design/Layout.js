import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Layout, Sidebar, NavDrawer, Panel } from 'react-toolbox/lib/layout';
import theme from 'react-toolbox/lib/layout/theme.css';

const ThemedLayout = withStyles(theme)(Layout);
const ThemedSidebar = withStyles(theme)(Sidebar);
const ThemedNavDrawer = withStyles(theme)(NavDrawer);
const ThemedPanel = withStyles(theme)(Panel);

export { Layout as RawLayout } from 'react-toolbox/lib/layout/Layout';
export { Sidebar as RawSidebar } from 'react-toolbox/lib/layout/Sidebar';
export { NavDrawer as RawNavDrawer } from 'react-toolbox/lib/layout/NavDrawer';
export { Panel as RawPanel } from 'react-toolbox/lib/layout/Panel';

export {
    ThemedLayout as Layout,
    ThemedSidebar as Sidebar,
    ThemedNavDrawer as NavDrawer,
    ThemedPanel as Panel
};

export default ThemedLayout;