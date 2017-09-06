import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { dropdownFactory } from 'react-toolbox/lib/dropdown/Dropdown';
import theme from 'react-toolbox/lib/dropdown/theme.css';
import { DROPDOWN } from 'react-toolbox/lib/identifiers';

import { Input } from './Input';

const Dropdown = dropdownFactory(Input);
const ThemedDropdown = withStyles(theme)(themr(DROPDOWN, theme)(Dropdown));

export { Dropdown as RawDropdown } from 'react-toolbox/lib/dropdown/Dropdown';

export { ThemedDropdown as Dropdown };

export default ThemedDropdown;