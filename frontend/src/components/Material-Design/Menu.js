import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { menuFactory } from 'react-toolbox/lib/menu/Menu';
import { MenuDivider } from 'react-toolbox/lib/menu/MenuDivider';
import { menuItemFactory } from 'react-toolbox/lib/menu/MenuItem';
import { iconMenuFactory } from 'react-toolbox/lib/menu/IconMenu';

import theme from 'react-toolbox/lib/menu/theme.css';
import { MENU } from 'react-toolbox/lib/identifiers';

import themedRippleFactory, { rippleTheme } from './Ripple';
import { IconButton } from './Button';

const MenuItem = menuItemFactory(themedRippleFactory({}));
const ThemedMenuItem = withStyles(theme, rippleTheme)(themr(MENU, theme)(MenuItem));
const Menu = menuFactory(ThemedMenuItem);
const ThemedMenu = withStyles(theme, rippleTheme)(themr(MENU, theme)(Menu));
const IconMenu = iconMenuFactory(IconButton, ThemedMenu)
const ThemedMenuDivider = withStyles(theme, rippleTheme)(themr(MENU, theme)(MenuDivider));
const ThemedIconMenu = withStyles(theme, rippleTheme)(themr(MENU, theme)(IconMenu));

export { Menu as RawMenu } from 'react-toolbox/lib/menu/Menu';
export { MenuDivider as RawMenuDivider };
export { MenuItem as RawMenuItem } from 'react-toolbox/lib/menu/MenuItem';
export { IconMenu as RawIconMenu } from 'react-toolbox/lib/menu/IconMenu';

export {
    ThemedMenu as Menu,
    ThemedMenuDivider as MenuDivider,
    ThemedMenuItem as MenuItem,
    ThemedIconMenu as IconMenu
};

export default ThemedMenu;