import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
    Menu,
    MenuDivider,
    MenuItem,
    IconMenu
} from 'react-toolbox/lib/menu';
import theme from 'react-toolbox/lib/menu/theme.css';

const ThemedMenu = withStyles(theme)(Menu);
const ThemedMenuDivider = withStyles(theme)(MenuDivider);
const ThemedMenuItem = withStyles(theme)(MenuItem);
const ThemedIconMenu = withStyles(theme)(IconMenu);

export { Menu as RawMenu } from 'react-toolbox/lib/menu/Menu';
export { MenuDivider as RawMenuDivider } from 'react-toolbox/lib/menu/MenuDivider';
export { MenuItem as RawMenuItem } from 'react-toolbox/lib/menu/MenuItem';
export { IconMenu as RawIconMenu } from 'react-toolbox/lib/menu/IconMenu';

export {
    ThemedMenu,
    ThemedMenuDivider,
    ThemedMenuItem,
    ThemedIconMenu,
};

export default ThemedMenu;