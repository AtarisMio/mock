import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import theme from 'react-toolbox/lib/tabs/theme.css';

const ThemedTab = withStyles(theme)(Tab);
const ThemedTabs = withStyles(theme)(Tabs);

export { Tab as RawTab } from 'react-toolbox/lib/tabs/Tab';
export { Tabs as RawTabs } from 'react-toolbox/lib/tabs/Tabs';

export {
    ThemedTab as Tab,
    ThemedTabs as Tabs
};

export default ThemedTabs;