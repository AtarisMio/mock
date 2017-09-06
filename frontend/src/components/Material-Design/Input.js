import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { inputFactory } from 'react-toolbox/lib/input/Input';
import theme from 'react-toolbox/lib/input/theme.css';
import { INPUT } from 'react-toolbox/lib/identifiers';

import { FontIcon } from './FontIcon';

const Input = inputFactory(FontIcon);
const ThemedInput = withStyles(theme)(themr(INPUT, theme)(Input));

export { Input as RawInput } from 'react-toolbox/lib/input/Input';

export { ThemedInput as Input };

export default ThemedInput;