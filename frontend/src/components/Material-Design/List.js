import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { listFactory } from 'react-toolbox/lib/list/List';
import { ListItemAction } from 'react-toolbox/lib/list/ListItemAction';
import { listItemActionsFactory } from 'react-toolbox/lib/list/ListItemActions';
import { listItemContentFactory } from 'react-toolbox/lib/list/ListItemContent';
import { listItemLayoutFactory } from 'react-toolbox/lib/list/ListItemLayout';
import { ListSubHeader } from 'react-toolbox/lib/list/ListSubHeader';
import { ListItemText } from 'react-toolbox/lib/list/ListItemText';
import { listCheckboxFactory } from 'react-toolbox/lib/list/ListCheckbox';
import { ListDivider } from 'react-toolbox/lib/list/ListDivider';
import { listItemFactory } from 'react-toolbox/lib/list/ListItem';

import theme from 'react-toolbox/lib/list/theme.css';
import { LIST } from 'react-toolbox/lib/identifiers';

import { Avatar } from './Avatar';
import { Checkbox } from './Checkbox';
import themedRippleFactory, { rippleTheme } from './Ripple';

const ripple = themedRippleFactory({ centered: false, listItemIgnore: true });

const ThemedListItemAction = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItemAction));
const ThemedListSubHeader = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListSubHeader));
const ThemedListItemText = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItemText));
const ThemedListDivider = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListDivider));

const ListItemContent = listItemContentFactory(ThemedListItemText);
const ListItemActions = listItemActionsFactory(ThemedListItemAction);
const ThemedListItemActions = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItemActions));
const ThemedListItemContent = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItemContent));

const ListCheckbox = listCheckboxFactory(Checkbox, ThemedListItemContent);
const ListItemLayout = listItemLayoutFactory(Avatar, ThemedListItemContent, ThemedListItemActions);
const ThemedListCheckbox = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListCheckbox));
const ThemedListItemLayout = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItemLayout));

const ListItem = listItemFactory(ripple, ThemedListItemLayout, ThemedListItemContent);
const ThemedListItem = withStyles(theme, rippleTheme)(themr(LIST, theme)(ListItem));

const List = listFactory(ThemedListItem);
const ThemedList = withStyles(theme, rippleTheme)(themr(LIST, theme)(List));

export { List as RawList } from 'react-toolbox/lib/list/List';
export { ListItemActions as RawListItemActions } from 'react-toolbox/lib/list/ListItemActions';
export { ListItemContent as RawListItemContent } from 'react-toolbox/lib/list/ListItemContent';
export { ListItemLayout as RawListItemLayout } from 'react-toolbox/lib/list/ListItemLayout';
export { ListSubHeader as RawListSubHeader };
export { ListItemText as RawListItemText };
export { ListCheckbox as RawListCheckbox } from 'react-toolbox/lib/list/ListCheckbox';
export { ListDivider as RawListDivider };
export { ListItem as RawListItem } from 'react-toolbox/lib/list/ListItem';

export {
    ThemedList as List,
    ThemedListItemActions as ListItemActions,
    ThemedListItemContent as ListItemContent,
    ThemedListItemLayout as ListItemLayout,
    ThemedListSubHeader as ListSubHeader,
    ThemedListItemText as ListItemText,
    ThemedListCheckbox as ListCheckbox,
    ThemedListDivider as ListDivider,
    ThemedListItem as ListItem
};

export default ThemedList;