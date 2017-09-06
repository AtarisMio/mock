import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Dropdown } from 'react-toolbox/lib/dropdown';
import theme from 'react-toolbox/lib/dropdown/theme.css';

const ThemedDropdown = withStyles(theme)(Dropdown);

export { Dropdown as RawDropdown } from 'react-toolbox/lib/dropdown/Dropdown';

export { ThemedDropdown as Dropdown };

export default ThemedDropdown;