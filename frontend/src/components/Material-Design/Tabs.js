import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { tabFactory } from 'react-toolbox/lib/tabs/Tab';
import { TabContent } from 'react-toolbox/lib/tabs/TabContent';
import { tabsFactory } from 'react-toolbox/lib/tabs/Tabs';
import theme from 'react-toolbox/lib/tabs/theme.css';
import { TABS } from 'react-toolbox/lib/identifiers';

import { FontIcon } from './FontIcon';
import themedRippleFactory, { rippleTheme } from './Ripple';

const ThemedTabContent = withStyles(theme, rippleTheme)(themr(TABS, theme)(TabContent));
const Tab = tabFactory(themedRippleFactory({ centered: false }));
const ThemedTab = withStyles(theme, rippleTheme)(themr(TABS, theme)(Tab));
const Tabs = tabsFactory(ThemedTab, ThemedTabContent, FontIcon);
const ThemedTabs = withStyles(theme, rippleTheme)(themr(TABS, theme)(Tabs));

export { Tab as RawTab } from 'react-toolbox/lib/tabs/Tab';
export { Tabs as RawTabs } from 'react-toolbox/lib/tabs/Tabs';

export {
    ThemedTab as Tab,
    ThemedTabs as Tabs
};

export default ThemedTabs;