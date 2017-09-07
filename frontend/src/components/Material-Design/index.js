import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';

import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
// themes
// import Allthemes from './index.css';
import app_bar from 'react-toolbox/lib/app_bar/theme.css';
import autocomplete from 'react-toolbox/lib/autocomplete/theme.css';
import avatar from 'react-toolbox/lib/avatar/theme.css';
import button from 'react-toolbox/lib/button/theme.css';
import card from 'react-toolbox/lib/card/theme.css';
import checkbox from 'react-toolbox/lib/checkbox/theme.css';
import chip from 'react-toolbox/lib/chip/theme.css';
import date_picker from 'react-toolbox/lib/date_picker/theme.css';
import dialog from 'react-toolbox/lib/dialog/theme.css';
import drawer from 'react-toolbox/lib/drawer/theme.css';
import dropdown from 'react-toolbox/lib/dropdown/theme.css';
import input from 'react-toolbox/lib/input/theme.css';
import layout from 'react-toolbox/lib/layout/theme.css';
// import link from 'react-toolbox/lib/link/theme.css';
import list from 'react-toolbox/lib/list/theme.css';
import menu from 'react-toolbox/lib/menu/theme.css';
import navigation from 'react-toolbox/lib/navigation/theme.css';
import overlay from 'react-toolbox/lib/overlay/theme.css';
import progress_bar from 'react-toolbox/lib/progress_bar/theme.css';
import radio from 'react-toolbox/lib/radio/theme.css';
import ripple from 'react-toolbox/lib/ripple/theme.css';
import slider from 'react-toolbox/lib/slider/theme.css';
import snackbar from 'react-toolbox/lib/snackbar/theme.css';
import switchtheme from 'react-toolbox/lib/switch/theme.css';
import table from 'react-toolbox/lib/table/theme.css';
import tabs from 'react-toolbox/lib/tabs/theme.css';
import time_picker from 'react-toolbox/lib/time_picker/theme.css';
import tooltip from 'react-toolbox/lib/tooltip/theme.css';

import { Link, link } from './Link';

const themes = {
    'RTAppBar': app_bar,
    'RTAutocomplete': autocomplete,
    'RTAvatar': avatar,
    'RTButton': button,
    'RTCard': card,
    'RTChip': chip,
    'RTCheckbox': checkbox,
    'RTDatePicker': date_picker,
    'RTDialog': dialog,
    'RTDrawer': drawer,
    'RTDropdown': dropdown,
    'RTInput': input,
    'RTLayout': layout,
    'RTLink': link,
    'RTList': list,
    'RTMenu': menu,
    'RTNavigation': navigation,
    'RTOverlay': overlay,
    'RTProgressBar': progress_bar,
    'RTRadio': radio,
    'RTRipple': ripple,
    'RTSlider': slider,
    'RTSnackbar': snackbar,
    'RTSwitch': switchtheme,
    'RTTable': table,
    'RTTabs': tabs,
    'RTTooltip': time_picker,
    'RTTimePicker': tooltip,
};

const Allthemes = [
    app_bar,
    autocomplete,
    avatar,
    button,
    card,
    checkbox,
    chip,
    date_picker,
    dialog,
    drawer,
    dropdown,
    input,
    layout,
    link,
    list,
    menu,
    navigation,
    overlay,
    progress_bar,
    radio,
    ripple,
    slider,
    snackbar,
    switchtheme,
    table,
    tabs,
    time_picker,
    tooltip,
];

const ThemeProviderWithStyles = withStyles(...Allthemes)(({...args}) => <ThemeProvider theme={themes} {...args} />);


export {
    AppBar,
    Autocomplete,
    Avatar,
    Button, IconButton, BrowseButton,
    Card, CardTitle, CardMedia, CardText, CardActions,
    Checkbox,
    Chip,
    DatePicker,
    Dialog,
    Drawer,
    Dropdown,
    FontIcon,
    Input,
    Layout, Panel, NavDrawer, Sidebar,
    List, ListCheckbox, ListItem, ListDivider, ListSubHeader,
    // Link,
    Menu, MenuDivider, MenuItem, IconMenu,
    Navigation, // Don't use property of routes
    ProgressBar,
    RadioGroup, RadioButton,
    Ripple,
    Slider,
    Snackbar,
    Switch,
    Table, TableHead, TableRow, TableCell,
    Tabs, Tab,
    TimePicker,
    Tooltip
} from 'react-toolbox';
export { Link, ThemeProviderWithStyles as ThemeProvider };

// const ThemedAppBar = withStyles(app_bar, button, ripple)(AppBar);
// const ThemedAutocomplete = withStyles(autocomplete, avatar, chip, input)(Autocomplete);
// const ThemedAvatar = withStyles(avatar)(Avatar);
// const ThemedButton = withStyles(button, ripple)(Button);
// const ThemedIconButton = withStyles(button, ripple)(IconButton);
// const ThemedBrowseButton = withStyles(button, ripple)(BrowseButton);
// const ThemedCard = withStyles(card, avatar)(Card);
// const ThemedCardTitle = withStyles(card, avatar)(CardActions);
// const ThemedCardActions = withStyles(card, avatar)(CardMedia);
// const ThemedCardMedia = withStyles(card, avatar)(CardText);
// const ThemedCardText = withStyles(card, avatar)(CardTitle);
// const ThemedCheckbox = withStyles(checkbox, ripple)(Checkbox);
// const ThemedChip = withStyles(chip, avatar)(Chip);
// const ThemedDatePicker = withStyles(date_picker, button, ripple, input, dialog, overlay)(DatePicker);
// const ThemedDialog = withStyles(dialog, button, ripple, overlay)(Dialog);
// const ThemedDrawer = withStyles(drawer, overlay)(Drawer);
// const ThemedDropdown = withStyles(dropdown, input)(Dropdown);
// const ThemedInput = withStyles(input)(Input);
// const ThemedSidebar = withStyles(layout, drawer, overlay)(Sidebar);
// const ThemedNavDrawer = withStyles(layout, drawer, overlay)(NavDrawer);
// const ThemedPanel = withStyles(layout)(Panel);
// const ThemedLayout = withStyles(layout, app_bar, button, ripple, drawer, overlay)(Layout);
// const ThemedLink = withStyles(link)(Link);
// const ThemedListSubHeader = withStyles(list, ripple)(ListSubHeader);
// const ThemedListDivider = withStyles(list, ripple)(ListDivider);
// const ThemedListCheckbox = withStyles(list, checkbox, ripple)(ListCheckbox);
// const ThemedListItem = withStyles(list, avatar, ripple)(ListItem);
// const ThemedList = withStyles(list, avatar, ripple)(List);
// const ThemedMenuItem = withStyles(menu, ripple)(MenuItem);
// const ThemedMenu = withStyles(menu, ripple)(Menu);
// const ThemedMenuDivider = withStyles(menu, ripple)(MenuDivider);
// const ThemedIconMenu = withStyles(menu, button, ripple)(IconMenu);
// const ThemedNavigation = withStyles(navigation, button, ripple, link)(Navigation);
// // const ThemedOverlay = withStyles(overlay)(Overlay);
// const ThemedProgressBar = withStyles(progress_bar)(ProgressBar);
// const ThemedRadioButton = withStyles(radio, ripple)(RadioButton);
// const ThemedRadioGroup = withStyles(radio, ripple)(RadioGroup);
// const ThemedRipple = withStyles(ripple)(Ripple);
// const ThemedSlider = withStyles(slider, input, progress_bar)(Slider);
// const ThemedSnackbar = withStyles(snackbar, button, ripple)(Snackbar);
// const ThemedSwitch = withStyles(switchtheme, ripple)(Switch);
// const ThemedTableCell = withStyles(table)(TableCell);
// const ThemedTableHead = withStyles(table, checkbox, ripple)(TableHead);
// const ThemedTableRow = withStyles(table, checkbox, ripple)(TableRow);
// const ThemedTable = withStyles(table, checkbox, ripple)(Table);
// const ThemedTab = withStyles(tabs, ripple)(Tab);
// const ThemedTabs = withStyles(tabs, ripple)(Tabs);
// const ThemedTimePicker = withStyles(time_picker, input, dialog, button, ripple, overlay)(TimePicker);
// const ThemedTooltip = withStyles(tooltip, ripple)(Tooltip);




// export {
// AppBar as RawAppBar,
// Autocomplete as RawAutocomplete,
// Avatar as RawAvatar,
// Button as RawButton, IconButton as RawIconButton, BrowseButton as RawBrowseButton,
// Card as RawCard, CardTitle as RawCardTitle, CardMedia as RawCardMedia, CardText as RawCardText, CardActions as RawCardActions,
// Checkbox as RawCheckbox,
// Chip as RawChip,
// DatePicker as RawDatePicker,
// Dialog as RawDialog,
// Drawer as RawDrawer,
// Dropdown as RawDropdown,
// FontIcon as RawFontIcon,
// Input as RawInput,
// Layout as RawLayout, Panel as RawPanel, NavDrawer as RawNavDrawer, Sidebar as RawSidebar,
// Link as RawLink,
// List as RawList, ListCheckbox as RawListCheckbox, ListItem as RawListItem, ListDivider as RawListDivider, ListSubHeader as RawListSubHeader,
// Menu as RawMenu, MenuDivider as RawMenuDivider, MenuItem as RawMenuItem, IconMenu as RawIconMenu,
// Navigation as RawNavigation,
// ProgressBar as RawProgressBar,
// RadioGroup as RawRadioGroup, RadioButton as RawRadioButton,
// Ripple as RawRipple,
// Slider as RawSlider,
// Snackbar as RawSnackbar,
// Switch as RawSwitch,
// Table as RawTable, TableHead as RawTableHead, TableRow as RawTableRow, TableCell as RawTableCell,
// Tabs as RawTabs, Tab as RawTab,
// TimePicker as RawTimePicker,
// Tooltip as RawTooltip,

// ThemedAppBar as AppBar,
// ThemedAutocomplete as Autocomplete,
// ThemedAvatar as Avatar,
// ThemedButton as Button, ThemedIconButton as IconButton, ThemedBrowseButton as BrowseButton,
// ThemedCard as Card, ThemedCardTitle as CardTitle, ThemedCardMedia as CardMedia, ThemedCardText as CardText, ThemedCardActions as CardActions,
// ThemedCheckbox as Checkbox,
// ThemedChip as Chip,
// ThemedDatePicker as DatePicker,
// ThemedDialog as Dialog,
// ThemedDrawer as Drawer,
// ThemedDropdown as Dropdown,
// ThemedFontIcon as FontIcon,
// ThemedInput as Input,
// ThemedLayout as Layout, ThemedPanel as Panel, ThemedNavDrawer as NavDrawer, ThemedSidebar as Sidebar,
// ThemedList as List, ThemedListCheckbox as ListCheckbox, ThemedListItem as ListItem, ThemedListDivider as ListDivider, ThemedListSubHeader as ListSubHeader,
// ThemedLink as Link,
// ThemedMenu as Menu, ThemedMenuDivider as MenuDivider, ThemedMenuItem as MenuItem, ThemedIconMenu as IconMenu,
// ThemedNavigation as Navigation,
// ThemedProgressBar as ProgressBar,
// ThemedRadioGroup as RadioGroup, ThemedRadioButton as RadioButton,
// ThemedRipple as Ripple,
// ThemedSlider as Slider,
// ThemedSnackbar as Snackbar,
// ThemedSwitch as Switch,
// ThemedTable as Table, ThemedTableHead as TableHead, ThemedTableRow as TableRow, ThemedTableCell as TableCell,
// ThemedTabs as Tabs, ThemedTab as Tab,
// ThemedTimePicker as TimePicker,
// ThemedTooltip as Tooltip,
// }