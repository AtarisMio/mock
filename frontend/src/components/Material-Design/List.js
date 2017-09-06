import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
    List,
    ListItemActions,
    ListItemContent,
    ListItemLayout,
    ListSubHeader,
    ListItemText,
    ListCheckbox,
    ListDivider,
    ListItem
} from 'react-toolbox/lib/list';
import theme from 'react-toolbox/lib/list/theme.css';

const ThemedList = withStyles(theme)(List);
const ThemedListItemActions = withStyles(theme)(ListItemActions);
const ThemedListItemContent = withStyles(theme)(ListItemContent);
const ThemedListItemLayout = withStyles(theme)(ListItemLayout);
const ThemedListSubHeader = withStyles(theme)(ListSubHeader);
const ThemedListItemText = withStyles(theme)(ListItemText);
const ThemedListCheckbox = withStyles(theme)(ListCheckbox);
const ThemedListDivider = withStyles(theme)(ListDivider);
const ThemedListItem = withStyles(theme)(ListItem);

export { List as RawList } from 'react-toolbox/lib/list/List';
export { ListItemActions as RawListItemActions } from 'react-toolbox/lib/list/ListItemActions';
export { ListItemContent as RawListItemContent } from 'react-toolbox/lib/list/ListItemContent';
export { ListItemLayout as RawListItemLayout } from 'react-toolbox/lib/list/ListItemLayout';
export { ListSubHeader as RawListSubHeader } from 'react-toolbox/lib/list/ListSubHeader';
export { ListItemText as RawListItemText } from 'react-toolbox/lib/list/ListItemText';
export { ListCheckbox as RawListCheckbox } from 'react-toolbox/lib/list/ListCheckbox';
export { ListDivider as RawListDivider } from 'react-toolbox/lib/list/ListDivider';
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