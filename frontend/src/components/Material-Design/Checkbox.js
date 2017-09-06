import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Checkbox } from 'react-toolbox/lib/checkbox';
import theme from 'react-toolbox/lib/checkbox/theme.css';

const ThemedCheckbox = withStyles(theme)(Checkbox);

export { Checkbox as RawCheckbox } from 'react-toolbox/lib/checkbox/Checkbox';

export { ThemedCheckbox };

export default ThemedCheckbox;