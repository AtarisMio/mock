import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Switch } from 'react-toolbox/lib/switch';
import theme from 'react-toolbox/lib/switch/theme.css';

const ThemedSwitch = withStyles(theme)(Switch);

export { Switch as RawSwitch } from 'react-toolbox/lib/switch/Switch';

export { ThemedSwitch as Switch };

export default ThemedSwitch;