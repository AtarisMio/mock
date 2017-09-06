import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Input } from 'react-toolbox/lib/input';
import theme from 'react-toolbox/lib/input/theme.css';

const ThemedInput = withStyles(theme)(Input);

export { Input as RawInput } from 'react-toolbox/lib/input/Input';

export { ThemedInput };

export default ThemedInput;